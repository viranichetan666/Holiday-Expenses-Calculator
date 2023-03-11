import { UserExpenseType } from './payouts.interface';

export const combineDuplicateExpense = (usersExpense: UserExpenseType[]) => {
  let totalSpentAmount = 0;
  // { [name]: [amount] }
  const combineDuplicateExpenseInObject = usersExpense.reduce(
    (acc: Record<string, number>, userExpense: UserExpenseType) => {
      totalSpentAmount += userExpense.amount;
      if (acc[userExpense.name]) {
        return {
          ...acc,
          [userExpense.name]: acc[userExpense.name] + userExpense.amount,
        };
      } else {
        return { ...acc, [userExpense.name]: userExpense.amount };
      }
    },
    {}
  );

  // [[name, amount], [name, amount]]
  const combineDuplicateExpenseInObjectEntries =
    Object.entries(combineDuplicateExpenseInObject) || [];

  // [{name: 'xyz', amount: 20}] same as request body but duplicate name is combined
  const combineDuplicateExpenseInArrayOfObject =
    combineDuplicateExpenseInObjectEntries.map((e) => ({
      name: e[0],
      amount: e[1],
    }));

  return {
    totalSpentAmount,
    combineDuplicateExpenseInObject,
    combineDuplicateExpenseInArrayOfObject,
    totalUser: combineDuplicateExpenseInObjectEntries.length,
  };
};

export const ownsAmountByUserWhoPaidLessAmountToUserWhoPaidMoreAmount = (
  userPendingAmountToSettleUp: number,
  paidAmountWhichIsMoreThanEqualShare: number,
  equalShare: number,
  amountWhichUserCanGive: number
) => {
  /*
  If combined amount of paidAmountWhichIsMoreThanEqualShare and user's (userWhoPaidLessThanEqualShare)
  pending amount to settle up is less than equal to equalShare then give paidAmountWhichIsMoreThanEqualShare to
  user (userWhoPaidMoreThanEqualShare) else give amountWhichUserCanGive.

  Suppose user A paid 20 more than equal share
          Total paid amount by user B 10.
          Total paid amount by user C 20.
          Equal share is 25

          For User C:
          Now if 10+20 <= 25 (false)
            User B able to give 15 to user A because if user B paid more than 15 it's not satisfied 
            equalShare amount condition
          
          For User C:
          Now user A want 5 to satisfy equalShare amount condition 
            if 20+5 <= 25 (true)
            User C need to give the remaining amount to user A to fullFill user A's equalShare condition
  
  */
  return userPendingAmountToSettleUp + paidAmountWhichIsMoreThanEqualShare <=
    equalShare
    ? paidAmountWhichIsMoreThanEqualShare
    : amountWhichUserCanGive;
};
