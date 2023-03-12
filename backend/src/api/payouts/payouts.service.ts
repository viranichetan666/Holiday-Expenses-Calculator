import { SettleUpType, UserExpenseType } from './payouts.interface';
import {
  combineDuplicateExpense,
  ownsAmountByUserWhoPaidLessAmountToUserWhoPaidMoreAmount,
} from '../../helper/utils';

const expenseCalculator = (body: UserExpenseType[]) => {
  try {
    const usersExpense = body;

    if(!body) {
      throw "Bad Data"
    }

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

    let result: SettleUpType[] = [];

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
            owes: userWhoPaidLessThanEqualShare.name,
            owed: userWhoPaidMoreThanEqualShare.name,
            amount: ownsAmountByUserWhoPaidLessAmount,
          },
        ];
      }
    }
    return {
      data: { total: totalSpentAmount, equalShare, payouts: result },
      message: 'success',
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const payoutsService = {
  expenseCalculator,
};
