function checkAnswers(sectionId) {
    const container = document.getElementById(sectionId);
    const inputs = container.querySelectorAll('.quiz-input');

    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer')?.trim() ?? '';
        const userAnswer = input.value.trim();

        if (userAnswer === "") {
            input.classList.remove('correct', 'wrong');
            return;
        }

        if (userAnswer === correctAnswer) {
            input.classList.remove('wrong');
            input.classList.add('correct');
        } else {
            input.classList.remove('correct');
            input.classList.add('wrong');
        }
    });
}

function showAnswers(sectionId) {
    const container = document.getElementById(sectionId);
    const inputs = container.querySelectorAll('.quiz-input');

    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer');
        input.value = correctAnswer;
        input.classList.remove('wrong');
        input.classList.add('correct');
    });
}
/* ==========================================
连线配对题逻辑 (Click-to-Match)
========================================== */
document.addEventListener("DOMContentLoaded", function() {
    let selectedLeft = null;

    // 绑定左侧选项点击事件
    const leftItems = document.querySelectorAll('.left-item');
    const rightItems = document.querySelectorAll('.right-item');

    leftItems.forEach(item => {
        item.addEventListener('click', function() {
            // 如果已经匹配成功，则不可再点
            if (this.classList.contains('matched')) return; 

            // 移除其他左侧选项的选中状态
            leftItems.forEach(el => el.classList.remove('selected', 'wrong-shake'));
            rightItems.forEach(el => el.classList.remove('wrong-shake'));

            // 选中当前点击的项
            this.classList.add('selected');
            selectedLeft = this;
        });
    });

    // 绑定右侧选项点击事件
    rightItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;
            
            if (!selectedLeft) {
                alert("请先点击选择左侧的语法规则哦！");
                return;
            }
            
            const expectedMatch = selectedLeft.getAttribute('data-match');
            const rightId = this.getAttribute('data-id');
            
            // 验证是否匹配正确
            if (expectedMatch === rightId) {
                // 匹配成功：变绿并移除选中状态
                selectedLeft.classList.remove('selected');
                selectedLeft.classList.add('matched');
                this.classList.add('matched');
                
                // 成功后清空记录
                selectedLeft = null; 
            } else {
                // 匹配失败：触发抖动变红特效
                this.classList.add('wrong-shake');
                selectedLeft.classList.add('wrong-shake');
                
                // 动画结束后移除特效class
                setTimeout(() => {
                    this.classList.remove('wrong-shake');
                    if (selectedLeft) selectedLeft.classList.remove('wrong-shake');
                }, 400);
            }
        });
    });
});
// 定义你的访问密码（可以设置多个通用卡密）
const VALID_PASSWORDS = ["DeuVIP001", "BegegnungA2", "VielErfolg88","Wunderbar100","HalloDeutsch",
    "PassA2Now", "GrammatikTop","Fleissig2026","SehrGut007","LernenVIP","DeutschPro20","SprechenGut",
    "Wortschatz99", "SuperDeutsch", "KlarMachen", "A2Bestehen","HalloBerlin", "MeisterA2", "EinfachDeu",
    "Perfekt2026"];

// 页面加载完成后自动检测验证状态
document.addEventListener("DOMContentLoaded", function() {
    checkAuthentication();
});

function checkAuthentication() {
    // 1. 读取本地存储中的验证标记
    const isAuthed = localStorage.getItem("runner_studio_vip_authed");

    if (isAuthed === "true") {
        // 说明之前已经输入过正确密码，直接显示受保护的内容
        showProtectedContent();
    } else {
        // 未验证，弹出密码输入窗口
        promptPassword();
    }
}

function promptPassword() {
    const inputPassword = prompt("请输入您的课程专属授权码：");

    if (inputPassword && VALID_PASSWORDS.includes(inputPassword.trim())) {
        // 2. 密码正确：存入 localStorage，实现后续永久免密
        localStorage.setItem("runner_studio_vip_authed", "true");
        alert("验证成功！欢迎使用自学自测系统。");
        showProtectedContent();
    } else if (inputPassword !== null) {
        // 密码错误处理
        alert("授权码错误，请重新输入或联系客服。");
        promptPassword(); // 重新弹窗
    } else {
        // 点击了取消：隐藏内容并返回工作室首页
        alert("需要授权码才能访问该系统。");
        window.location.href = "https://www.runnerstudio.com";
    }
}

function showProtectedContent() {
    // 将页面主内容区域显示出来
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
        mainContent.style.display = "block";
    }
}
