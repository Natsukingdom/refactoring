// sample p112 ~
// 関数の抽出

function printOwing(invoice) {
  printBanner()
  let outstanding = calculateOutStanding()
  // 明細の印字(print details)
  console.log(`name: ${invoice.customer}`)
  console.log(`amount: ${outstanding}`)
}

// | 以下のように修正される
// V

function priontOwing(invoice) {
  printBanner()
  let outstanding = calculateOutstanding()
  printDetails(outstanding)

  function printDetails(outstanding) {
    console.log(`name: ${invoice.customer}`)
    console.log(`amount: ${outstanding}`)
  }
}

// 動機
// コードの断片をみて、何をしているのか理解した上で、独立した関数として抽出し、目的にふさわしい名前をつける
// 示唆のあるテキスト
// 大きな関数の中には、 何をするかを説明したコメントで始まるコードの断片が見つかることが  よくあります。 コメントは、 関数としてその断片を抽出するときの、 ふさわしい名前を示唆して  くれることがあります。
// ＭａｒｔｉｎＦｏｗｌｅｒ. リファクタリング 既存のコードを安全に改善する（第2版） (p. 113). Kindle Edition.

// スコープ外となる変数がない場合
// ローカル変数を使用する場合

function printOwing(invoice) {
  printBanner()

  // 未払金の計算
  const outstanding = calculateOutStanding(invoice)

  // 締日の記録
  recordDueDate(invoice)

  // 明細の印字
  printDetails(invoice, outstanding)
}

function calculateOutStanding(invoice) {
  let result = 0
  for (const o of invoice.orders) {
    outstanding += o.amount
  }
  return result
}

function recordDueDate(invoice) {
  const today = Clock.today
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  )
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`)
  console.log(`amount: ${outstanding}`)
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`)
}

function printBanner() {
  console.log('***********************')
  console.log('**** Customer Owes ****')
  console.log('***********************')
}
