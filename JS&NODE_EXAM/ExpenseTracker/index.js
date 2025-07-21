import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const expenseMap = new Map();

function showMenu() {
    console.log('Expense Tracker');
    console.log('1.Add an expense');
    console.log('2.View all expenses');
    console.log('3.Update an expense');
    console.log('4.Delete an expense');
    console.log('5.Show total expenses');
    console.log('6.Exit');
    rl.question('Select an option (1-6): ', handleOption)
}

function handleOption(option) {
    switch (option) {
        case '1':
            addExpense();
            break;
        case '2':
            viewAllExpense();
            break;
        case '3':
            updateExpense();
            break;
        case '4':
            deleteExpense();
            break;
        case '5':
            showTotalExpense();
            break;
        case '6':
            console.log('Exiting ....');
            rl.close();
            break;
        default:
            console.log('Please enter valid option (1-6).Try again');
            showMenu();
            break;
    }
}

function addExpense() {
    rl.question('Enter a Category : ', category =>{
        rl.question('Enter Amount: ', amountInput =>{
            const amount = parseFloat(amountInput);
            if (category && !isNaN(amount)) {
                expenseMap.set(category,amount);
            }
            showMenu();
        })
    })
}

function viewAllExpense() {
    if (expenseMap.size !== 0) {
        for (const [key, value] of expenseMap.entries()) {
            console.log(`Category: ${key}, Amount: ${value}`);
        }
    } else {
        console.log('No Expense is added');
    }
    showMenu();
}

function updateExpense() {
    rl.question('Enter a Category: ', categoryInput =>{
        if(expenseMap.has(categoryInput)){
            rl.question('Enter new amount: ', amountInput =>{
                let newAmount = parseFloat(amountInput)

                expenseMap.set(categoryInput,newAmount)
                console.log(`${categoryInput} is updated`)
                showMenu();
            })
        }
    })
}

function deleteExpense() {
    rl.question('Enter a Category: ', categoryInput =>{
        if(expenseMap.has(categoryInput)){
            expenseMap.delete(categoryInput)
        }
        showMenu();
    })
}

function showTotalExpense() {
    let total = 0;
    if(expenseMap.size !== 0){
      for (const [key, value] of expenseMap.entries()) {
        total += value;
      }
      console.log(`Total Amount: Rs.${total}`);
    }
    showMenu()
}

showMenu()