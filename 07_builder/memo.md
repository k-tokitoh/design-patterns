# 感想

- 本の例の中には複数の要素が含まれていると感じた
  - a. constructor で一気にではなく、builder のメソッド呼び出しにより段階的にオブジェクトを構成する
  - b. builder について、抽象をきってポリモーフィックな複数バージョンを用意することで、部分の構築についてバリエーションを持たせる
  - c. builder の各メソッドの一連の呼び出しを director というレイヤでラップする（facade パターン）
  - d. director について、ポリモーフィックな複数バージョンを用意することで、builder の利用の類型を複数つくる（bridge パターン）
- builder パターンの核は a であり、b, c, d は必ずしも伴わない
- この repo の good の例には全部盛り込んだ
- 実用的な例はクエリビルダー

  - クエリオブジェクトをメソッドの呼び出しを通じて組み立てていく(a)
  - builder のインターフェースは個別の DB エンジンに依存しない抽象レベルにしておき、個別の DB エンジンに対応する builder の具象クラスを定義する(b)
  - 場合によってはクエリのユースケースに応じて、クエリの組み立てを類型化する（以下の zenn の記事など）
  - ex.
    - https://refactoring.guru/ja/design-patterns/builder/php/example#example-1
    - https://zenn.dev/levtech/articles/a5e06a97b534b2

- いままで発想できたかは怪しい
- 発想する手がかりとしては「constructor で色んな場合分けに対応している」「constructor の引数が多いし、自由度が高い」

# 練習問題

## 1

- 単に java の文法の問題なので skip

## 2

- 本の例とサンプルが異なるためできない
- director を変更しても builder を変更する必要がない = builder が director に依存しないことは十分に理解した

## 3

- 本の例とサンプルが異なるためできない
- builder のサブクラスを追加/変更しても既存の builder や他のサブクラスを変更する必要がない = builder や builder のサブクラスが他のサブクラスに依存しないことは十分に理解した

## 4

- StringBuilder は java の組み込みクラス
- String は immutable なので文字列の変更のたびに異なるオブジェクトを生成するが、StringBuilder は immutable なので同一のオブジェクトを使いまわせる
- 本の例のように変更を頻繁に行う場合には特に、StringBuilder の方がパフォーマンス上望ましい
