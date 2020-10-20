// 変数の抽出 p125

// サンプル リファクタリング前
return (
  order.quantity * order.itemPrice -
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
  Math.min(order.quantity * order.itemPrice * 0.1, 100)
)

// サンプル リファクタリング後

const basePrice = order.quantity * order.itemPrice
const quantityDiscount =
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
const shipping = Math.min(basePrice * 0.1, 100)
return basePrice - quantityDiscount + shipping

/** 動機
 *
 * 複雑化しすぎた式に名前をつけてより理解しやすくする。
 * デバッグにも役立つことがある.
 * より広いコンテキストで意味を持つのであれば関数として抽出することになるかもしれない。
 *
 */

/**手順
 * 抽出しようとする式に副作用がないことを確認する
 * 変更不可な変数を定義する . 名付けたい式の値をその変数に設定する
 * 元の式を新しい変数で置き換える
 * テストする
 */

/** 例
 *
 */

// リファクタリング前

function price(order) {
  // price = base price - quantity discount + shipping
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
  )
}

// リファクタリング後

function price(order) {
  const basePrice = order.quantity * order.itemPrice
  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
  const shipping = Math.min(basePrice * 0.1, 100) // ここでもbasePriceを使用している

  return basePrice - quantityDiscount + shipping
}

/** クラスのコンテキストにおける例
 *
 *
 */

class Order {
  constructor(aRecord) {
    this._data = aRecord
  }

  get quantity() {
    return this._data.quantity
  }
  get itemPrice() {
    return this._data.itemPrice
  }

  get price() {
    return basePrice - quantityDiscount + shipping
  }

  get basePrice() {
    return this.quantity * this.itemPrice
  }

  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05
  }

  get shipping() {
    return Math.min(this.basePrice * 0.1, 100)
  }
}


/** まとめ
 * 全体で使えそうだったためメソッドとして切り出した
 * コンテクストに応じて切り替えるとよし
 */
