<!-- omit in toc -->
# React MSAL Android WebView Sample

## 概要

Android WebView 上で表示されることを前提に、MSAL Android による Microsoft Entra ID のサインイン結果を受け取って認証状態を引き継ぐ React 側のサンプルアプリです。

PC など Android を介さない環境では、MSAL React を用いて同一の React アプリ上でサインインを行う構成としています。

## 実装ポイント

**src/env.ts**

環境変数設定ファイルです。

MSAL Reactの設定情報を定義します。

**src/types/**

Androidアプリから提供されるJavaScript関数の型を定義します。

**src/features/auth**

ここで認証機能を作成しています。

**src/App.tsx**

AuthProviderでラップし、この中で`useAuth()`を利用可能にします。

**xrc/pages/main/index.tsx**

この中で`useAuth()`を使ってログイン、ログアウト、ユーザー名表示、アクセストークン取得を実装しています。

> このサンプルアプリはMainPageのみの単一ページとしています。単一ページではないアプリの場合も同様に実装可能です。
