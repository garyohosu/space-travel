# Space Travel

1969年の「スペース・トラベル」に着想を得た、現代版ブラウザ宇宙旅行ゲームの初期構成です。現在はタイトル画面からThree.jsの仮航行画面へ遷移し、宇宙空間・太陽・宇宙船・操作盤の土台を表示します。天体データ、物理演算、ランキング通信などは後続範囲です。

## 開発

```bash
npm install
npm run dev
```

## ビルド・テスト・Lint

```bash
npm run build
npm test
npm run lint
```

ビルド成果物は `dist/` に出力されます。Viteは相対ベース (`./`) で設定しており、GitHub Pagesのサブディレクトリ配信に対応します。保存はlocalStorageのみで、保存層とスコア記録のインターフェースを分離しています。
