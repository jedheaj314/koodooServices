/* eslint-disable no-console */
/** *
  Type 🅰️
  denotes a balance history where the balance amount decreases by varying amounts each month.
  - decreasedByVaryingAmount

  Type 🅱️
  is one where the balance amount changes by the same amount each month.
  - changedBySameAmount
  ** */

const getChangeAmount = (a, b) => (a > b ? a - b : b - a)

const decreasedByVaryingAmount = (decreasedByVaryingAmounts, previousBalance, currentBalance) => {
  if (decreasedByVaryingAmounts) {
    if (previousBalance < currentBalance) {
      return false
    }
  }

  return decreasedByVaryingAmounts
}

const mapResult = (decreasedByVaryingAmounts, changedBySameAmount) => {
  if (decreasedByVaryingAmounts) {
    return 'A'
  } if (changedBySameAmount) {
    return 'B'
  }

  return 'C'
}

const getType = (accountBalanceHistory) => {
  const amountChanges = []
  let i = 1
  let decreasedByVaryingAmounts = true
  let changedBySameAmount = true
  while (i < accountBalanceHistory.length) {
    const currentBalance = accountBalanceHistory[i].account.balance.amount
    const previousBalance = accountBalanceHistory[i - 1].account.balance.amount

    decreasedByVaryingAmounts = decreasedByVaryingAmount(
      decreasedByVaryingAmounts,
      previousBalance,
      currentBalance,
    )

    const changeAmount = getChangeAmount(previousBalance, currentBalance)
    if (amountChanges.length > 0) {
      const previousChange = amountChanges[amountChanges.length - 1]
      if (changeAmount !== previousChange) {
        changedBySameAmount = false
      } else {
        decreasedByVaryingAmounts = false
      }

      if (!decreasedByVaryingAmounts && !changedBySameAmount) {
        return 'C'
      }
    }

    amountChanges.push(changeAmount)
    i += 1
  }

  return mapResult(decreasedByVaryingAmounts, changedBySameAmount)
}

const accountTypeChecker = (accountBalanceHistory) => {
  if (!accountBalanceHistory
    || !Array.isArray(accountBalanceHistory)
    || accountBalanceHistory.length < 3) return null

  accountBalanceHistory
    .sort((m1, m2) => (m1.monthNumber > m2.monthNumber ? 1 : -1))

  return getType(accountBalanceHistory)
}

exports.accountTypeChecker = accountTypeChecker

