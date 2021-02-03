const { accountTypeChecker } = require('../balanceHistoryService')

// SETUP
// Type 🅰️
// a balance history where the balance amount decreases by varying amounts each month.
const typeABalancehistory = [
  {
    monthNumber: 0,
    account: { balance: { amount: 600 } },
  },
  {
    monthNumber: 1,
    account: { balance: { amount: 400 } },
  },
  {
    monthNumber: 2,
    account: { balance: { amount: 5 } },
  },
]

// Type 🅱️
// where the balance amount changes by the same amount each month.
const typeBBalancehistory = [
  {
    monthNumber: 0,
    account: { balance: { amount: 50 } },
  },
  {
    monthNumber: 1,
    account: { balance: { amount: 100 } },
  },
  {
    monthNumber: 2,
    account: { balance: { amount: 150 } },
  },
  {
    monthNumber: 3, // three months ago
    account: { balance: { amount: 200 } },
  },
]

const noneOfTheTypes = [
  {
    monthNumber: 3,
    account: { balance: { amount: 10 } },
  },
  {
    monthNumber: 2,
    account: { balance: { amount: 1 } },
  },
  {
    monthNumber: 1,
    account: { balance: { amount: 6 } },
  },
  {
    monthNumber: 0,
    account: { balance: { amount: 3 } },
  },
]

const unsorted = [
  {
    monthNumber: 0,
    account: { balance: { amount: 10 } },
  },
  {
    monthNumber: 2,
    account: { balance: { amount: 3 } },
  },
  {
    monthNumber: 1,
    account: { balance: { amount: 6 } },
  },
  {
    monthNumber: 3,
    account: { balance: { amount: 2 } },
  },
]

// HELPER
const mapBalanceHistoryInput = input => (
  input
    .map(b => ({ monthNumber: b.monthNumber, account: { balance: { amount: b.amount } } })))

// TEST
describe('Balance hostory tests', () => {
  test.each([
    [[]],
    [[{ monthNumber: 0, amount: 200 }]],
    [[{ monthNumber: 0, amount: 200 }, { monthNumber: 1, amount: 400 }]],
  ])('Given invalid account balance history accountTypeChecker returns null', (balanceList) => {
    const invalidBalanceHistory = mapBalanceHistoryInput(balanceList)
    const result = accountTypeChecker(invalidBalanceHistory)
    expect(result).toEqual(null)
  })

  test.each([
    [null],
    ['invalid'],
  ])('Given invalid type of account balance history accountTypeChecker returns null', (invalidBalance) => {
    const result = accountTypeChecker(invalidBalance)
    expect(result).toEqual(null)
  })

  test('scenario 1: Given decreased with varying change accoutTypeChecker returns A.', () => {
    const result = accountTypeChecker(typeABalancehistory)
    expect(result).toEqual('A')
  })

  test('scenario 2: Given same changed balance each month accoutTypeChecker returns B.', () => {
    const result = accountTypeChecker(typeBBalancehistory)
    expect(result).toEqual('B')
  })

  test('scenario 3: Given balance increased and  different change each month accoutTypeChecker returns C.', () => {
    const result = accountTypeChecker(noneOfTheTypes)
    expect(result).toEqual('C')
  })

  test('Given unsorted  balance history accoutTypeChecker returns expected result.', () => {
    const result = accountTypeChecker(unsorted)
    expect(result).toEqual('A')
  })

  test.each([
    [[{ monthNumber: 0, amount: 200 }, { monthNumber: 1, amount: 400 },
      { monthNumber: 2, amount: 600 }, { monthNumber: 3, amount: 400 }]],
    [[{ monthNumber: 0, amount: 600 }, { monthNumber: 1, amount: 400 },
      { monthNumber: 2, amount: 200 }, { monthNumber: 3, amount: 0 }]],
    [[{ monthNumber: 0, amount: 2 }, { monthNumber: 1, amount: 4 },
      { monthNumber: 2, amount: 2 }, { monthNumber: 3, amount: 4 }]],
  ])('Given balance increased and decreased with same change accountTypeChecker returns B', (balanceList) => {
    const invalidBalanceHistory = mapBalanceHistoryInput(balanceList)
    const result = accountTypeChecker(invalidBalanceHistory)
    expect(result).toEqual('B')
  })
})
