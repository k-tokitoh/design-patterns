# 感想

- まあ多数の要素が複雑に作用しあっていたらまずいな、とは思えそうだし、集権的に交通整理することも思いつけそう
- 本の例、Mediator と Colleague が実質的に循環依存しているのは良くなさそう
- observe パターンとの関係
  - mediator/colleague は互いに通知しあう関係にあるが、observer パターンが適用されるのは mediator->colleague の通知
  - 以下の 2 点を満たすと observe パターンと言える
    - observer をポリモーフィックに扱う
      - 今回の例は colleague が plain だけだけど、他にも colleague の種類が存在する場合がある
      - そうした場合に異なる種類の colleague を observer としてポリモーフィックに扱うように書いたら observer パターン
    - 動的な observer を add/delete する
      - これも observer パターンの性質のひとつ

# 練習問題

## 1

- 本の例に依存した問題であるため skip
- 本の例の場合は validation を mediator に集めているため mediator のみの変更となる
- ただし validation を colleague に寄せることも可能であり、その場合は colleague のみの変更になると思われる
