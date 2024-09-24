'use strict' 


        const textDisplay = document.getElementById('text-display');
        const inputArea = document.getElementById('input-area');
        const timerDisplay = document.getElementById('timer');
        const wpmDisplay = document.getElementById('wpm');
        const errorsDisplay = document.getElementById('errors');
        const startButton = document.getElementById('start-btn');

        let timeLeft = 60;
        let timer;
        let errors = 0;
        let totalTyped = 0;
        let isTestActive = false;

        const words = textDisplay.innerText.split(' ');

        startButton.addEventListener('click', function(){
            if (isTestActive){
                return;
            } 

            isTestActive = true;
            inputArea.disabled = false; // input-area true and you can write in it.
            inputArea.value = '';
            inputArea.focus();
            errors = 0;
            totalTyped = 0;
            errorsDisplay.textContent = '0';
            wpmDisplay.textContent = '0';
            timeLeft = 60;
            startButton.textContent = 'Test in Progress';
            startButton.disabled = true;

            timer = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = 'Time:' +timeLeft+'s'; //"Time: ${timeLeft}s"

                if (timeLeft === 0) {
                    endTest();
                }
            }, 1000);


            inputArea.addEventListener('input', function(){
                const inputWords = inputArea.value.trim().split(' ');
            const lastInputWord = inputWords[inputWords.length - 1];
            
            totalTyped = inputArea.value.length;

            errors = inputWords.reduce((acc, word, index) => {
                if (index >= words.length){
                     return acc;
                    }    //accumulator,word,index 
                return acc + (word !== words[index] ? 1 : 0);
            }, 0);

            errorsDisplay.textContent = errors;

            const minutes = (60 - timeLeft) / 60;
            const wpm = Math.round((totalTyped / 5) / minutes);
            wpmDisplay.textContent = wpm;

            if (inputWords.length === words.length && lastInputWord === words[words.length - 1]) {
                endTest();
            }
            });


        });
        

        function endTest() {
            clearInterval(timer);
            inputArea.disabled = true;
            isTestActive = false;
            startButton.textContent = 'Start New Test';
            startButton.disabled = false;
            inputArea.removeEventListener('input', checkInput);
        }
   