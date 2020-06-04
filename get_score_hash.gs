function func(){
  let up_hash =　//上場のハッシュ
      [   //取り出し方： hash[0].key -> '50億円以上'   hash[0].score -> 5
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
      ];
  let yet_up_hash =　//未上場のハッシュ
      [
        {status :'TDB・未上場', key: '5億円以上', score:  5},
        {status :'TDB・未上場', key: '1億円以上', score:  4},
        {status :'TDB・未上場', key: '5千万円以上', score:  3},
        {status :'TDB・未上場', key: '1千万円以上', score:  2},
        {status :'TDB・未上場', key: '1千万円未満', score:  1},
        {status :'TDB・未上場', key: '資本金不明', score:   0},
        {status :'TDB・未上場', key: '黒字', score:   2},
        {status :'TDB・未上場', key: '赤字', score:  -1},
        {status :'TDB・未上場', key: '業績不明', score:  0},
        {status :'TDB・未上場', key: '点数あり（50点以上）', score:  2},
        {status :'TDB・未上場', key: 'Ｄ評価（50点未満）', score:  1},
        {status :'TDB・未上場', key: 'データ取得不能', score:  0},
        {status :'TDB・未上場', key: '上場企業の関連会社である', score:  1},
        {status :'TDB・未上場', key: '上記以外の資本関係', score:  0}
      ];
  return { up_hash, yet_up_hash }
}