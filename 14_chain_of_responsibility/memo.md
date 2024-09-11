# 感想

- ケースとしては event bubbling とかか。まあ発想はできそう。

# 練習問題

## 1

- 親コンポーネント

## 2

- 外部からは support()経由で、つまり chain of responsibility の仕組みのうえで呼ぶことを強制する意図。名指しで特定のクラスに resolve させない。

## 3

- loop で実装した
- 最初の support()の中で for ループを書き、順次 next していくということか。最初発想できなかった
