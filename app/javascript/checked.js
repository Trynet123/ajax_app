// DOMの取得からエンドポイントへのリクエストなどは、すべてこのcheck関数へ記述
function check() {
  const posts = document.querySelectorAll(".post");
  // postというクラス名を持つ要素はメモの数だけ存在

// forEachを記述して、それぞれの要素への処理を記述する場所を用意
  posts.forEach(function (post) {

    // 重複のイベント発火を回避
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    // 「要素1つずつに対して、『クリック』した際に動作するイベント駆動」を設定
    // clickはリクエスト処理
    post.addEventListener("click", () => {
    // ここにクリックした時に行う「何らかの処理」を記述していく
      const postId = post.getAttribute("data-id");
      // getAttributeで属性値を取得することができるので、メモのidを取得
      const XHR = new XMLHttpRequest();
      // 変数XHRから、XMLHttpRequestのメソッドを使用できる
      XHR.open("GET", `/posts/${postId}`, true);
      // リクエストの詳細は設定できた

      XHR.responseType = "json";
      // レスポンスの形式を指定
      XHR.send();
      // sendメソッドを記述することで、はじめてリクエストが行えます。
      // リクエストの送信準備はできました。

      // レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }

        const item = XHR.response.post;
        // レスポンスされてきたJSONにアクセスできます。
        // checkedアクションで返却したitemは、XHR.response.postで取得

        if (item.checked === true) {
        // 既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセット
          post.setAttribute("data-check", "true");

        } else if (item.checked === false) {
          // 未読であればdata-checkは属性ごと削除
          post.removeAttribute("data-check");
        }
        // レスポンスに対応する記述が完了
      };
    });
  });
}
setInterval(check, 1000);