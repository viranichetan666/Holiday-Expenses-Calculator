import { CalculatorResponse, UserExpense } from './calculator.interface';
import {
  combineDuplicateExpense,
  ownsAmountByUserWhoPaidLessAmountToUserWhoPaidMoreAmount,
} from './utils';

const expenseCalculator = (body: UserExpense[]) => {
  try {
    const usersExpense = body;

    const {
      combineDuplicateExpenseInArrayOfObject,
      combineDuplicateExpenseInObject,
      totalSpentAmount,
      totalUser,
    } = combineDuplicateExpense(usersExpense);

    const equalShare = totalSpentAmount / totalUser;

    //Users Who paid more than EqualShare
    const usersWhoPaidMoreThanEqualShare =
      combineDuplicateExpenseInArrayOfObject.filter(
        (expense) => expense.amount > equalShare
      );

    //Users Who paid less than EqualShare
    const usersWhoPaidLessThanEqualShare =
      combineDuplicateExpenseInArrayOfObject.filter(
        (expense) => expense.amount < equalShare
      );

    let result: CalculatorResponse[] = [];

    for (const userWhoPaidLessThanEqualShare of usersWhoPaidLessThanEqualShare) {
      for (const userWhoPaidMoreThanEqualShare of usersWhoPaidMoreThanEqualShare) {
        // Amount paid by user (userWhoPaidMoreThanEqualShare) which is more than equal share
        const paidAmountWhichIsMoreThanEqualShare =
          combineDuplicateExpenseInObject[userWhoPaidMoreThanEqualShare.name] -
          equalShare;

        // Amount which user (userWhoPaidLessThanEqualShare) able to give to other user (userWhoPaidMoreThanEqualShare)
        const amountWhichUserCanGive =
          equalShare -
          combineDuplicateExpenseInObject[userWhoPaidLessThanEqualShare.name];

        const ownsAmountByUserWhoPaidLessAmount =
          ownsAmountByUserWhoPaidLessAmountToUserWhoPaidMoreAmount(
            combineDuplicateExpenseInObject[userWhoPaidLessThanEqualShare.name],
            paidAmountWhichIsMoreThanEqualShare,
            equalShare,
            amountWhichUserCanGive
          );

        // If ownsAmountByUserWhoPaidLessAmount <= 0 then continue to new iteration without going further down
        if (ownsAmountByUserWhoPaidLessAmount <= 0) continue;

        /* 
        Update amount in combineDuplicateExpenseInObject everytime to track the record of 
        amount (amountWhichUserCanGive and paidAmountWhichIsMoreThanEqualShare) 
        */
        combineDuplicateExpenseInObject[userWhoPaidMoreThanEqualShare.name] -=
          ownsAmountByUserWhoPaidLessAmount;
        combineDuplicateExpenseInObject[userWhoPaidLessThanEqualShare.name] +=
          ownsAmountByUserWhoPaidLessAmount;

        // Update the result with keys (owed: userWhoPaidMoreThanEqualShare, owns: userWhoPaidLessThanEqualShare, amount)
        result = [
          ...result,
          {
            owed: userWhoPaidMoreThanEqualShare.name,
            owns: userWhoPaidLessThanEqualShare.name,
            amount: ownsAmountByUserWhoPaidLessAmount,
          },
        ];
      }
    }
    return { data: result, message: 'success' };
  } catch (error) {
    throw new Error(error);
  }
};

export const calculatorService = {
  expenseCalculator,
};
