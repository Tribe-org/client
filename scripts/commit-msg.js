const fs = require('fs');
const { execSync } = require('child_process');

// 현재 Git 브랜치 이름을 가져오는 함수
const getCurrentBranch = () => {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
    }).trim();
  } catch (error) {
    console.error('Error: Unable to get current branch.');
    process.exit(1);
  }
};

// 브랜치 이름에서 티켓 번호 추출하는 함수
const getTicket = (branch) => {
  const parts = branch.split('/');
  if (parts.length > 1) {
    return parts[1].toUpperCase();
  }
  return '';
};

// main 함수 실행
const main = () => {
  const commitMsgFile = process.argv[2];

  if (!fs.existsSync(commitMsgFile)) {
    console.error('Error: Commit message file not found.');
    process.exit(1);
  }

  let currentMsg = fs.readFileSync(commitMsgFile, 'utf-8').trim();

  if (!currentMsg) {
    console.error('Error: Commit message cannot be empty.');
    process.exit(1);
  }

  const currentBranch = getCurrentBranch();
  const ticket = getTicket(currentBranch);

  if (!ticket || !ticket.startsWith('TRIBE-')) {
    process.exit(0);
  }

  // 대소문자를 구분하지 않고 '[TRIBE-'로 시작하는지 확인
  if (currentMsg.toLowerCase().startsWith('[tribe-')) {
    process.exit(0);
  }

  const newCommitMsg = `[${ticket}] ${currentMsg}`;

  fs.writeFileSync(commitMsgFile, newCommitMsg, 'utf-8');
};

main();
