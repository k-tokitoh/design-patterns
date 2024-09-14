# 感想

- 「機能の階層」と「実装の階層」で分離する必要はない。特定の関心を切り出してポリモーフィックに扱えるようにしよう、というだけの話だと思う
- ただ、切り出されたものを利用する側にもいくつかのバリエーションがある場合が念頭に置かれている
  - だからこそそれぞれのバリエーションを bridge するイメージ
- 複数の次元が混在して、多数の組み合わせが生じるときに、そのうちひとつの次元を別のクラス階層へと切り出す試み
- abstraction/implementor という用語法は混乱を招くので避けた方がいいと思う（本のサンプルコードもそれに従っている）

  - abstraction は必ず実装である（implementor を利用する必要があるので）
  - implementor はインターフェースでありうる

- まあ発想できる気はする

- シンプルに記述すると、bridge の右側と左側で任意の組み合わせを許容することになる
- 組み合わせに関する制約を表現したい場合、abstract factory パターンを利用できる（good/with_abstract_factory に記述した）

# 練習問題

## 1

- 本の例だと表示回数は Display の責務
- 自分の例で相当するのは car/bus と異なる motorcycle の追加など

## 2

- 本の例だと表示する文字列の取得は DisplayImpl の責務
- 自分の例で相当するのは、awesome/normal と異なる poor な engine の追加など

## 3

- DisplayImpl のサブクラスとして CharDisplayImpl を新たに定義する
- CountDisplay のサブクラスとして IncreaseDisplay を新たに定義する
  - increaseDisplay()で、for ループで multiDisplay を複数回呼び出し、引数の繰り返し回数には index を指定する
