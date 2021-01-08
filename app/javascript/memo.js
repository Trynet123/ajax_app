function memo() {
  // getElementByIdを用いて「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // FormDataとsendを使用して、メモ投稿のフォームに入力された情報を送信
    const formData = new FormData(document.getElementById("form"));

    // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // リクエストの内容を引数に追記、非同期通信はtrue
    XHR.open("POST", "/posts", true);
    // 返却されるデータ形式はJSON
    XHR.responseType = "json";

    XHR.send(formData);
    // エンドポイントにメモ投稿の内容を送信

    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      // レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content");
      // メモの入力フォームをリセット
      // この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、
      // リセットする必要があります。ここではリセット対象の要素であるcontentという要素を取得しています。

      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      // listという要素に対して、insertAdjacentHTMLでHTMLを追加
      // 第一引数にafterendを指定することで、要素listの直後に挿入
      formText.value = "";
      // 「メモの入力フォームに入力されたままの文字」はリセット

      // 上記で非同期でのメモ投稿機能が実装できました
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);