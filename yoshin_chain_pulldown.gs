/**
https://qiita.com/sakaimo/items/689e9f3c516bb5a96c19
 * グローバル変数の定義
 */
const USE_SHEET_NAME     = "use";
const SETTING_SHEET_NAME = "settings";
const CATEGORY1_COL_NUM  = 1; // B列

const SCORE_SHEET_NAME     = "score";
const ss = SpreadsheetApp.getActiveSpreadsheet()
/**
 * 本体
 */
function onEdit(e) {
  if (!isTargetCol(e)) return;

  const category1Value = e.value;
  const changedRow     = e.range.getRow();
  const changedCol     = e.range.getColumn();
  const useSheet       = e.source.getSheetByName(USE_SHEET_NAME);
  //const lastCol        = e.range.getLastColumn();
  // 設定シート のデータ(二次元配列)
  const settingData = e.source.getSheetByName(SETTING_SHEET_NAME).getDataRange().getValues();

  // カテゴリ1に対応するカテゴリ2,,3,,,,を入れておくところ
  let catgory2List = [],
      catgory3List = [],
      catgory4List = [],
      catgory5List = [],
      list_array = [catgory2List, catgory3List, catgory4List, catgory5List],
      count = 1;
  let result_array = [];

  // 設定シート のデータの中から、「選択されたカテゴリ1」に対応するカテゴリ2を取り出すところ
  // 初めのプルダウン選択が決定されれば、項目２、３...個目項目は一気に決まる
  for (i = 0; i < list_array.length; i++) {
    settingData.forEach( row => {
                        if (row[0] === category1Value) {
      console.log('row[count] は？:' + row[count])
      list_array[i].push(row[count]);
      
    }
  　});
    if(list_array[i].length === 0) return;
  
    console.log('list_array[0]は？' + list_array[0])
    console.log('list_array[0].length:' + list_array[0].length)
  
    // 編集されたセルの右のセルにカテゴリ2のプルダウンをセットする->(ループしてカテゴリ３にもセットする)
    const range = useSheet.getRange(changedRow, (changedCol + count));    //（）でくくらないと21になってしまう
    console.log('changedCol + countは？: ' + (changedCol + count))
  
    const rule  = SpreadsheetApp.newDataValidation().requireValueInList(list_array[i], true);
    rule.setAllowInvalid(false).build();
    range.setDataValidation(rule);  
  count++
  }
}

/**
 * プルダウン連動をさせる列かどうかの判断
 */
function isTargetCol(e) {
  // 値が削除されたときはvalueが undefになるので無視
  if (!e.range.getValue()) return false; // ※1

  // 関係ないシートのとき
  if (e.source.getSheetName() !== USE_SHEET_NAME) return false;

  // 列が違うとき
  if (e.range.getColumn() != CATEGORY1_COL_NUM) return false;

  return true;
}

/* ----------------------------------------------------------
 点数を出すには？
 https://qiita.com/mashvalue1/items/d1a05b025ee5dc123585  二次元配列から連想配列への変換　*/

function test() {
  let score_sheet = ss.getSheetByName(SCORE_SHEET_NAME),
      sheet_lastRow = score_sheet.getLastRow();
  
  const obj = Object.fromEntries([["foo", 1], ["bar", 2]]);
  //console.log(obj);   //  -> { foo: 1, bar: 2 }
  
  //AB列を連想配列にするには??
  let array_ab = score_sheet.getRange(1, 1, sheet_lastRow, 2).getValues(),  // AB配列を取得
      hash_ab = Object.fromEntries(array_ab); 　　// 連想配列作成
  //console.log("hash_ab['5億円未満'] = " + hash_ab['5億円未満']) // 値の取り出し
  
  console.log('hash_abは? ', hash_ab)  
  /*共通の名前でハッシュ作るなら？ シートからでなく手打ちで作ってみる--------------------------------
  https://www.sejuku.net/blog/27965
  let hash =
  [
   {status :'IR情報：上場', key: '50億円以上', score:  5},
   {status :'IR情報：上場', key: '２期連続増益', score: 2},
   {status :'IR情報：上場', key: '前期比＋５％以上', score: 1}
  ]
  取り出し方： hash[0].key -> '50億円以上'   hash[0].score -> 5
   ---------------------------------------------------------- */
  
  // CD配列を取得
  let array_cd = score_sheet.getRange(1, 3, sheet_lastRow, 2).getValues(),
      hash_cd = Object.fromEntries(array_cd);
  /*多次元にした場合
  let box =[hash_ab, hash_cd]         // [{   } , {    }]
  console.log('多次元の場合AB列取り出し' , box[0]['5億円未満'])
  console.log('多次元の場合CD列取り出し' , box[1]['不明'])
  */
  // ----------------------------------------------------------
  // トータルスコア
  // ----------------------------------------------------------
  let array_fg = score_sheet.getRange(1, 6, sheet_lastRow, 2).getValues(),  // FG配列を取得
      total_hash_fg = Object.fromEntries(array_fg),
      array_ij = score_sheet.getRange(1, 9, sheet_lastRow, 2).getValues(),  // IJ配列を取得
      total_hash_ij = Object.fromEntries(array_ij);
  //console.log('total_hash_ij の中身： ' , total_hash_ij)
  //console.log(total_hash_fg['A: 1億以上'])
  // ----------------------------------------------------------
  // プルダウンで選択された値を取得し、点数を集める
  // ----------------------------------------------------------


// ----------------------------------------------------------
// チェックボックスONのとき、行の値を集めて取得し、点数を計算する?
// ----------------------------------------------------------

  let use_sheet = ss.getSheetByName(USE_SHEET_NAME),
      use_last_col = use_sheet.getLastColumn()
  //まず行取得(2行目限定)
  let values = use_sheet.getRange(2,1,1,use_last_col).getValues(),
      value = [];
  console.log(values)
  console.log(values[0][values[0].length -1]) // 最後の要素
  
  if (values[0][values[0].length -1]　== '') { // 結果欄が空白の時は計算する
    console.log('計算する！')
  }
}

function myHashTest() {
  /*共通の名前でハッシュ作るなら？ シートからでなく手打ちで作ってみる--------------------------------
  https://www.sejuku.net/blog/27965
  */
  let hash =　//上場のハッシュ
  [
   {status :'IR情報：上場', key: '50億円以上', score:  5},
   {status :'IR情報：上場', key: '10億円以上', score:  4},
   {status :'IR情報：上場', key: '5億円以上',  score:  3}, 
   {status :'IR情報：上場', key: '5億円未満',  score:  1},
   {status :'IR情報：上場', key: '２期連続増益', score: 2},
   {status :'IR情報：上場', key: '２期連続増収', score: 1},
   {status :'IR情報：上場', key: '２期連続減収', score: -1},
   {status :'IR情報：上場', key: '２期連続赤字', score: -1},
   {status :'IR情報：上場', key: '２期連続減益', score: -2},
   {status :'IR情報：上場', key: '上記以外の業績', score:  0},
   {status :'IR情報：上場', key: '前期比＋５％以上', score: 1},
   {status :'IR情報：上場', key: '前期比△５％以上', score: -2},
   {status :'IR情報：上場', key: '上記以外の変動', score: 0}
  ]; //取り出し方： hash[0].key -> '50億円以上'   hash[0].score -> 5
  
  let use_sheet = ss.getSheetByName(USE_SHEET_NAME),
      use_last_col = use_sheet.getLastColumn()
  //まず行取得(2行目限定)
  let values = use_sheet.getRange(3,1,1,use_last_col).getValues(),
      total_score = 0;
  console.log(values[0][1])
  // values[0]と hashのkeyとを比べ、一致したらhashのscore値を足す
  for (i = 1; i < values[0].length; i++) {
     for (k = 0; k < hash.length; k++) {
      //console.log(key + "さんの値は、" + hash_ab[key] + "です。") ;
      //console.log('valuesは ',values[0][i])
      
      
      if (values[0][i] == hash[k].key ) {
        console.log(hash[k].key + 'が一致しました！')
        console.log('点数は,', hash[k].score, 'です。')
        total_score +=　hash[k].score
        continue  // 次のループ
      }
       console.log("total_scoreは、" + total_score + "です。");
    }
  }
  console.log('合計点は' +  total_score + "点です。")
}