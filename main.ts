#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Display the quiz header
console.log(chalk.bold.cyanBright("          MULTIPLE CHOICE QUESTION  'QUIZ'          \n"));

// Function to fetch quiz data
const apiLink: string = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
const fetchData = async (data: string) => {
    const fetchQuiz = await fetch(data);
    const quizQ = await fetchQuiz.json();
    return quizQ.results;
}

// Main function to run the quiz
const main = async () => {
    const quiz = await fetchData(apiLink);

    const startQuiz = async () => {
        let score: number = 0;

        // Prompt for username
        const nameAnswer = await inquirer.prompt({
            name: "question1",
            message: chalk.bold.hex("#e6b209")("\nFIRST. ENTER YOUR NAME!"),
            type: "input",
            validate: function (value) {
                if (value.trim() !== "") return true;
                return chalk.underline.redBright("\n ENTER A VALID NAME!!");
            }
        });

        // Loop through quiz questions
        for (let i = 0; i < quiz.length; i++) {
            const answer = [...quiz[i].incorrect_answers, quiz[i].correct_answer];

            const ans = await inquirer.prompt({
                name: "ques",
                type: "list",
                message: quiz[i].question,
                choices: answer.map((val: any) => val)
            });

            if (ans.ques === quiz[i].correct_answer) {
                ++score;
            }
        }

        // Display the final score
        console.log(chalk.bold.hex("#e6b209")(`CORRECT ANSWERS: ${score}`));
        console.log(chalk.bold.hex("#e6b209")("\nMULTIPLE CHOICE QUESTION  'QUIZ' IS END"));
    };

    startQuiz();
};

// Run the main function
main().catch(err => console.error(err));
