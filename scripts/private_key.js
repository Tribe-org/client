/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const fs = require('fs');
const dotenv = require('dotenv');

// .env 파일에서 환경 변수를 불러옵니다.
dotenv.config();

// 환경 변수에서 GPG 이메일과 비밀번호를 가져옵니다.
const GPG_EMAIL = process.env.GPG_EMAIL;
const GPG_PASSWORD = process.env.GPG_PASSWORD;

function getGpgKeyByEmail(email) {
  try {
    // gpg --list-keys 명령을 사용해 이메일과 관련된 키 목록을 검색
    const result = execSync(`gpg --list-keys --with-colons ${email}`, {
      encoding: 'utf-8',
    });

    // 결과에서 키 ID 추출 (pub 키 정보가 포함된 줄을 필터링)
    const lines = result.split('\n');
    for (const line of lines) {
      if (line.startsWith('pub')) {
        const keyId = line.split(':')[4]; // 키 ID는 콜론으로 구분된 5번째 필드
        return keyId;
      }
    }

    // 키가 없는 경우
    return null;
  } catch (error) {
    console.error(`Error listing keys: ${error.message}`);
    return null;
  }
}

function exportPrivateKey(keyId) {
  if (!GPG_PASSWORD) {
    console.error(
      '\x1b[31mError: GPG_PASSWORD environment variable is not set.\x1b[0m'
    );
    return false;
  }

  try {
    // gpg --export-secret-keys 명령을 사용해 개인 키를 추출
    const result = execSync(
      `gpg --pinentry-mode loopback --passphrase ${GPG_PASSWORD} --export-secret-keys --armor ${keyId}`,
      { encoding: 'utf-8' }
    );

    // 개인 키를 파일로 저장
    fs.writeFileSync('my_private_key.asc', result);
    console.log(
      '\x1b[32mPrivate key successfully exported to my_private_key.asc.\x1b[0m'
    );
    return true;
  } catch (error) {
    console.error(
      `\x1b[31mError exporting private key: ${error.message}\x1b[0m`
    );
    return false;
  }
}

function main() {
  if (!GPG_EMAIL) {
    console.error(
      '\x1b[31mError: GPG_EMAIL environment variable is not set.\x1b[0m'
    );
    return;
  }

  console.log(
    `\x1b[34mStarting the process to extract the necessary private key for the project using email: ${GPG_EMAIL}...\x1b[0m`
  );

  // 해당 이메일로 GPG 키 검색
  const keyId = getGpgKeyByEmail(GPG_EMAIL);

  if (keyId) {
    console.log(`Found GPG key: ${keyId}`);

    // 키 ID를 사용해 개인 키 추출
    const success = exportPrivateKey(keyId);

    if (!success) {
      console.error('Failed to export private key.');
    }
  } else {
    console.error('\x1b[31mNo GPG key found for the provided email.\x1b[0m');
  }
}

main();
