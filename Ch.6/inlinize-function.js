// 関数のインライン化 p.121

// 例 1

// リファクタリング前
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1
}

function moreTHanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5
}

// リファクタリング後

function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1
}

/** 動機
 *
 * 間接化しすぎた結果、どの関数も別の関数へ委譲しているだけにしか見えず、委譲に次ぐ委譲の途中で道に迷ってしまうようなとき
 * 有意義な間接化もあるが全てそうとは限らないのでインライン化して有効な間接化を洗い出して残りを取り除くべき
 *
 */

/** 手順
 *
 * 1. ポリモーフィックなメソッドでないことを確認（オーバーライドなどされているとインライン化できない）
 * 2. 呼び出し元をすべて見つける
 * 3. 各呼び出し元を関数の中身で置き換える
 * 4. 一つ置き換えるごとにテストする
 * 5. 関数の定義を取り除く
 *
 */

/** 例
 *
 * シンプルでないもの
 *
 */

// 1
// リファクタリング前
function rating(aDriver) {
  return moreThanFiveLateDeliveries(aDriver) ? 2 : 1
}

function moreThanFiveLateDeliveries(dvr) {
  return dvr.numberOfLateDeliveries > 5
}

// ほとんど最初の例と同じだが引数名が異なっている

// リファクタリング後

function rating(aDriver) {
  return aDriver.numberOfLateDeliveries > 5 ? 2 : 1
}

// 2 入り組んだ例

// リファクタリング前
function reportLines(aCustomer) {
  const lines = []
  gatherCustomerData(lines, aCustomer)
  return lines
}

function gatherCustomerData(out, aCustomer) {
  out.push(['name', aCustomer.name])
  out.push(['location', aCustomer.location])
}

// リファクタリング後

function reportLines(aCustomer) {
  const lines = []
  lines.push(['name', aCustomer.name])
  lines.push(['location', aCustomer.location])
}

/** まとめ
 * 小さなステップでことを進められるように備えておくことが肝要
 */
