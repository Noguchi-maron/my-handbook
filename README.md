# My handbook

## Overview
旅行などの際に使用するアプリです。

目的地を登録して、地図の閲覧や、施設情報の入手が手軽にできます。

| タイムライン | しおり |
| :---: | :---: |
| ![timeline](https://user-images.githubusercontent.com/85510791/147478818-b686f459-ff5b-4f33-ad1b-1d309f004073.png) | ![handbook](https://user-images.githubusercontent.com/85510791/147478872-88eb8fa8-449f-4e5a-a87f-0a027eca3239.png) |

## Demo
https://my-handbook-328611.web.app

## Installation/Usage
$ git clone https://github.com/Noguchi-maron/my-handbook.git
$ npm run dev

### テストアカウント
| メールアドレス | パスワード |
| :---: | :---: |
| test-user@test.com | testuser |

## Features
- 認証機能
  - メールアドレスとパスワードによるログイン
  - Googleアカウントによるログイン
- エリア選択によるフィルタリング機能
- 他のユーザーのしおりを閲覧するタイムライン
- ブックマーク機能
- コメント機能
- 写真アップロード機能
- マップの表示
- 目的地の並べ替え機能

## 実装予定機能
- フレンド機能
- しおりの共有・共同編集機能

## Technology
- JavaScript Framework: Nuxt.js(v2.15.8)
- Styling: Vuetify
- BaaS: Firebase
  - Database: Cloud Firestore
  - Hosting: Firebase Hosting
