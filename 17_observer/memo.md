# 感想

- observer パターン
  - 「つかうとよりきれいに書ける」というよりは「使わないと"連動する処理を動的に変更する"という要件が実現できない」という気がする
    - "polling"や"ありうる対象全てに固定的に通知"が一応代替的な方法とも言えるか。だいぶ性質が異なるが。
  - 発想自体は rxjs でも馴染みがあるのでできる
  - rxjs は、subscribe()に渡す引数の関数が observer と考えていいだろう
  - subscriber は update()を備えたクラスでもいいし、単なる callable な関数でもよくて、一定の共通インターフェースを備えていて observable からポリモーフィックに扱うことさえできればいい（それぞれの例を書いてみた）
  - 本の例では observable のインターフェースを切っていたが、observable を必ずしもポリモーフィックに扱いたい訳ではないので、このパターンに必要とは限らないだろう
- 似たものとして event bus も試してみた
  - observer より書くのが難しかった。通知するときに渡す付加的な情報について、イベントの種類ごとにバリエーションを持たせる部分の型の記述が。
  - event bus は受信者/発信者の 2 層の中間にもう 1 層を加えることでより疎結合な実装を実現する。

# 練習問題

## 1

- 本の例に依存した問題であるため skip
- concrete subject を変更しても subject/observable/concrete observable を変更する必要はない = subject/observable/concrete observable は concrete subject に依存しないことを十分に理解している

## 2

- 本の例に依存した問題であるため skip
- concrete observer を変更しても subject/concrete subject/observable を変更する必要はない = subject/concrete subject/observable は concrete observer に依存しないことを十分に理解している
