const fs = require('fs');
const path = require('path');

// noteから送られてきた記事データ（完全なデータ）
const allNoteArticles = {
  "data": {
      "contents": [
          {
              "id": 112465542,
              "type": "TextNote",
              "status": "published",
              "name": "水を飲む　ラジオ体操　その次に「短歌を詠む」という選択肢ー介護士・「詠まない歌人」ぐみ沢エイ子による新しいケアの形",
              "description": null,
              "likeCount": 28,
              "price": 0,
              "key": "n47647d3a4f8d",
              "slug": "slug-n47647d3a4f8d",
              "publishAt": "2025-05-12T11:00:00+09:00",
              "thumbnailExternalUrl": "",
              "eyecatch": "https://assets.st-note.com/production/uploads/images/189496232/rectangle_large_type_2_0f7dc9e8403d7e1dbdcfeee9b1904a6c.jpeg?fit=bounds&quality=85&width=1280",
              "user": {
                  "id": 8383826,
                  "key": "bbe223eab02a19b93b31d4fd749f0892",
                  "name": "Japan_X_College",
                  "urlname": "japan_x_college",
                  "nickname": "Japan_X_College",
                  "userProfileImagePath": "https://assets.st-note.com/production/uploads/images/150009902/profile_dd285a4ac7c163db3390d5763588b3e2.jpg?fit=bounds&format=jpeg&quality=85&width=330",
                  "customDomain": null,
                  "disableSupport": false,
                  "disableGuestPurchase": false,
                  "emailConfirmedFlag": true,
                  "likeAppealText": "お読みいただきありがとうございます！",
                  "likeAppealImage": "https://assets.st-note.com/poc-image/manual/production/preset_reaction_0.png",
                  "purchaseAppealTextNote": null,
                  "twitterNickname": "japan_x_college",
                  "shareAppeal": {
                      "text": null,
                      "image": null
                  },
                  "magazineAddAppeal": {
                      "text": null,
                      "image": null
                  }
              },
              "canRead": true,
              "isAuthor": false,
              "externalUrl": null,
              "customDomain": null,
              "body": "はじめに病気じゃない。何に不自由しているでもない。それなのに、なんとなく息が詰まる。言いたいことが言えないまま、何も言えなくなる。そんなときはありませんか？私にもしょっちゅうあります。\n\n介護士として働き始めて3年目の頃。ほぼノーメイクで、爪は短く切って、制服を大きなリュックにしまって帰る途中。オフィスカジュアルを身にまとって、綺麗に髪をまとめた同年代の女性とすれ違うと「私はどこかで間違ったのかな」と自信をなくすときがありました。でも、今は少し違います。いろいろな「言いたいけ",
              "separator": null,
              "isLimited": false,
              "isTrial": false,
              "canUpdate": false,
              "tweetText": "水を飲む　ラジオ体操　その次に「短歌を詠む」という選択肢ー介護士・「詠まない歌人」ぐみ沢エイ子による新しいケアの形｜Japan_X_College @japan_x_college",
              "twitterRelatedAccounts": "japan_x_college,note_PR",
              "isRefund": false,
              "isLiked": false,
              "commentCount": 0,
              "likes": [],
              "anonymousLikeCount": 14,
              "disableComment": false,
              "hashtags": [
                  {
                      "hashtag": {
                          "name": "#自分"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#言葉"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#短歌"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#現場"
                      }
                  }
              ],
              "twitterShareUrl": "https://twitter.com/intent/tweet?url=https://note.com/japan_x_college/n/n47647d3a4f8d&text=%E6%B0%B4%E3%82%92%E9%A3%B2%E3%82%80%E3%80%80%E3%83%A9%E3%82%B8%E3%82%AA%E4%BD%93%E6%93%8D%E3%80%80%E3%81%9D%E3%81%AE%E6%AC%A1%E3%81%AB%E3%80%8C%E7%9F%AD%E6%AD%8C%E3%82%92%E8%A9%A0%E3%82%80%E3%80%8D%E3%81%A8%E3%81%84%E3%81%86%E9%81%B8%E6%8A%9E%E8%82%A2%E3%83%BC%E4%BB%8B%E8%AD%B7%E5%A3%AB%E3%83%BB%E3%80%8C%E8%A9%A0%E3%81%BE%E3%81%AA%E3%81%84%E6%AD%8C%E4%BA%BA%E3%80%8D%E3%81%90%E3%81%BF%E6%B2%A2%E3%82%A8%E3%82%A4%E5%AD%90%E3%81%AB%E3%82%88%E3%82%8B%E6%96%B0%E3%81%97%E3%81%84%E3%82%B1%E3%82%A2%E3%81%AE%E5%BD%A2%EF%BD%9CJapan_X_College+%40japan_x_college&related=japan_x_college,note_PR",
              "facebookShareUrl": "https://www.facebook.com/share.php?u=https://note.com/japan_x_college/n/n47647d3a4f8d&t=%E6%B0%B4%E3%82%92%E9%A3%B2%E3%82%80%E3%80%80%E3%83%A9%E3%82%B8%E3%82%AA%E4%BD%93%E6%93%8D%E3%80%80%E3%81%9D%E3%81%AE%E6%AC%A1%E3%81%AB%E3%80%8C%E7%9F%AD%E6%AD%8C%E3%82%92%E8%A9%A0%E3%82%80%E3%80%8D%E3%81%A8%E3%81%84%E3%81%86%E9%81%B8%E6%8A%9E%E8%82%A2%E3%83%BC%E4%BB%8B%E8%AD%B7%E5%A3%AB%E3%83%BB%E3%80%8C%E8%A9%A0%E3%81%BE%E3%81%AA%E3%81%84%E6%AD%8C%E4%BA%BA%E3%80%8D%E3%81%90%E3%81%BF%E6%B2%A2%E3%82%A8%E3%82%A4%E5%AD%90%E3%81%AB%E3%82%88%E3%82%8B%E6%96%B0%E3%81%97%E3%81%84%E3%82%B1%E3%82%A2%E3%81%AE%E5%BD%A2%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89",
              "lineShareUrl": "https://line.naver.jp/R/msg/text/?%E6%B0%B4%E3%82%92%E9%A3%B2%E3%82%80%E3%80%80%E3%83%A9%E3%82%B8%E3%82%AA%E4%BD%93%E6%93%8D%E3%80%80%E3%81%9D%E3%81%AE%E6%AC%A1%E3%81%AB%E3%80%8C%E7%9F%AD%E6%AD%8C%E3%82%92%E8%A9%A0%E3%82%80%E3%80%8D%E3%81%A8%E3%81%84%E3%81%86%E9%81%B8%E6%8A%9E%E8%82%A2%E3%83%BC%E4%BB%8B%E8%AD%B7%E5%A3%AB%E3%83%BB%E3%80%8C%E8%A9%A0%E3%81%BE%E3%81%AA%E3%81%84%E6%AD%8C%E4%BA%BA%E3%80%8D%E3%81%90%E3%81%BF%E6%B2%A2%E3%82%A8%E3%82%A4%E5%AD%90%E3%81%AB%E3%82%88%E3%82%8B%E6%96%B0%E3%81%97%E3%81%84%E3%82%B1%E3%82%A2%E3%81%AE%E5%BD%A2%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89%0Ahttps://note.com/japan_x_college/n/n47647d3a4f8d",
              "audio": {},
              "pictures": [],
              "limitedMessage": null,
              "labels": [],
              "priorSale": null,
              "canMultipleLimitedNote": false,
              "isMembershipConnected": false,
              "hasAvailableCirclePlans": false,
              "isPinned": false,
              "pinnedUserNoteId": null,
              "spEyecatch": "https://assets.st-note.com/production/uploads/images/189496232/square_large_0f7dc9e8403d7e1dbdcfeee9b1904a6c.jpeg?fit=bounds&format=jpeg&quality=85&width=360",
              "enableBacktoDraft": false,
              "notificationMessages": [],
              "isProfiled": false,
              "isForWork": false,
              "isCircleDescription": false,
              "noteDraft": null,
              "noteUrl": "https://note.com/japan_x_college/n/n47647d3a4f8d",
              "imageCount": 9,
              "format": "4.0",
              "capabilities": {
                  "amazonpayCampaign": true,
                  "amazonpay": false,
                  "guestAmazonpay": false,
                  "rubyText": true,
                  "formulaText": true,
                  "duplication": true
              },
              "discountCampaigns": [],
              "remainedCharNum": 0,
              "priceInfo": {
                  "isFree": true,
                  "lowestPrice": null,
                  "hasMultiple": false,
                  "hasSubscription": false,
                  "oneshotLowestPrice": null
              }
          },
          {
              "id": 107343117,
              "type": "TextNote",
              "status": "published",
              "name": "【日本の抹茶文化を世界へ】 v18-1 加藤憧さんインタビュー",
              "description": null,
              "likeCount": 15,
              "price": 0,
              "key": "n5cbe2b90b1c9",
              "slug": "slug-n5cbe2b90b1c9",
              "publishAt": "2025-03-31T20:00:00+09:00",
              "thumbnailExternalUrl": "",
              "eyecatch": "https://assets.st-note.com/production/uploads/images/179318042/rectangle_large_type_2_d172939b1adce35522c6661e110ae67b.png?fit=bounds&quality=85&width=1280",
              "user": {
                  "id": 8383826,
                  "key": "bbe223eab02a19b93b31d4fd749f0892",
                  "name": "Japan_X_College",
                  "urlname": "japan_x_college",
                  "nickname": "Japan_X_College",
                  "userProfileImagePath": "https://assets.st-note.com/production/uploads/images/150009902/profile_dd285a4ac7c163db3390d5763588b3e2.jpg?fit=bounds&format=jpeg&quality=85&width=330",
                  "customDomain": null,
                  "disableSupport": false,
                  "disableGuestPurchase": false,
                  "emailConfirmedFlag": true,
                  "likeAppealText": "お読みいただきありがとうございます！",
                  "likeAppealImage": "https://assets.st-note.com/poc-image/manual/production/preset_reaction_0.png",
                  "purchaseAppealTextNote": null,
                  "twitterNickname": "japan_x_college",
                  "shareAppeal": {
                      "text": null,
                      "image": null
                  },
                  "magazineAddAppeal": {
                      "text": null,
                      "image": null
                  }
              },
              "canRead": true,
              "isAuthor": false,
              "externalUrl": null,
              "customDomain": null,
              "body": "今回は、早稲田大学の商学部に在籍しながら、2024年8月に「株式会社アルテム」を立ち上げた加藤 憧さんにインタビュー！\n\nオーガニック抹茶ブランドを海外に向けて発信する、という事業を行っている加藤さん。なぜ抹茶なの？というところから、事業開始までの道のり、今後の展望などについてお聞きしました！\n\n本物の日本文化を海外へ届けたい——（インタビュアー）本日はよろしくお願いします！早速ですが、加藤さんの活動についてお聞かせください。\n\n加藤さん（以下、加藤）：よろしくお願いします！",
              "separator": null,
              "isLimited": false,
              "isTrial": false,
              "canUpdate": false,
              "tweetText": "【日本の抹茶文化を世界へ】 v18-1 加藤憧さんインタビュー｜Japan_X_College @japan_x_college",
              "twitterRelatedAccounts": "japan_x_college,note_PR",
              "isRefund": false,
              "isLiked": false,
              "commentCount": 0,
              "likes": [],
              "anonymousLikeCount": 8,
              "disableComment": false,
              "hashtags": [
                  {
                      "hashtag": {
                          "name": "#起業"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#日本"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#文化"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#抹茶"
                      }
                  }
              ],
              "twitterShareUrl": "https://twitter.com/intent/tweet?url=https://note.com/japan_x_college/n/n5cbe2b90b1c9&text=%E3%80%90%E6%97%A5%E6%9C%AC%E3%81%AE%E6%8A%B9%E8%8C%B6%E6%96%87%E5%8C%96%E3%82%92%E4%B8%96%E7%95%8C%E3%81%B8%E3%80%91+v18-1+%E5%8A%A0%E8%97%A4%E6%86%A7%E3%81%95%E3%82%93%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%93%E3%83%A5%E3%83%BC%EF%BD%9CJapan_X_College+%40japan_x_college&related=japan_x_college,note_PR",
              "facebookShareUrl": "https://www.facebook.com/share.php?u=https://note.com/japan_x_college/n/n5cbe2b90b1c9&t=%E3%80%90%E6%97%A5%E6%9C%AC%E3%81%AE%E6%8A%B9%E8%8C%B6%E6%96%87%E5%8C%96%E3%82%92%E4%B8%96%E7%95%8C%E3%81%B8%E3%80%91+v18-1+%E5%8A%A0%E8%97%A4%E6%86%A7%E3%81%95%E3%82%93%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%93%E3%83%A5%E3%83%BC%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89",
              "lineShareUrl": "https://line.naver.jp/R/msg/text/?%E3%80%90%E6%97%A5%E6%9C%AC%E3%81%AE%E6%8A%B9%E8%8C%B6%E6%96%87%E5%8C%96%E3%82%92%E4%B8%96%E7%95%8C%E3%81%B8%E3%80%91+v18-1+%E5%8A%A0%E8%97%A4%E6%86%A7%E3%81%95%E3%82%93%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%93%E3%83%A5%E3%83%BC%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89%0Ahttps://note.com/japan_x_college/n/n5cbe2b90b1c9",
              "audio": {},
              "pictures": [],
              "limitedMessage": null,
              "labels": [],
              "priorSale": null,
              "canMultipleLimitedNote": false,
              "isMembershipConnected": false,
              "hasAvailableCirclePlans": false,
              "isPinned": false,
              "pinnedUserNoteId": null,
              "spEyecatch": "https://assets.st-note.com/production/uploads/images/179318042/square_large_d172939b1adce35522c6661e110ae67b.png?fit=bounds&format=jpeg&quality=85&width=360",
              "enableBacktoDraft": false,
              "notificationMessages": [],
              "isProfiled": false,
              "isForWork": false,
              "isCircleDescription": false,
              "noteDraft": null,
              "noteUrl": "https://note.com/japan_x_college/n/n5cbe2b90b1c9",
              "imageCount": 3,
              "format": "4.0",
              "capabilities": {
                  "amazonpayCampaign": true,
                  "amazonpay": false,
                  "guestAmazonpay": false,
                  "rubyText": true,
                  "formulaText": true,
                  "duplication": true
              },
              "discountCampaigns": [],
              "remainedCharNum": 0,
              "priceInfo": {
                  "isFree": true,
                  "lowestPrice": null,
                  "hasMultiple": false,
                  "hasSubscription": false,
                  "oneshotLowestPrice": null
              }
          },
          {
              "id": 102899264,
              "type": "TextNote",
              "status": "published",
              "name": "【クリスマスGalaでアーティストの夢を輝かせる】v13-2 武井佑太",
              "description": null,
              "likeCount": 16,
              "price": 0,
              "key": "n147c4f67d470",
              "slug": "slug-n147c4f67d470",
              "publishAt": "2025-03-16T11:00:00+09:00",
              "thumbnailExternalUrl": "",
              "eyecatch": "https://assets.st-note.com/production/uploads/images/178300901/rectangle_large_type_2_f05b3950d817350bd79bea7e06018096.jpeg?fit=bounds&quality=85&width=1280",
              "user": {
                  "id": 8383826,
                  "key": "bbe223eab02a19b93b31d4fd749f0892",
                  "name": "Japan_X_College",
                  "urlname": "japan_x_college",
                  "nickname": "Japan_X_College",
                  "userProfileImagePath": "https://assets.st-note.com/production/uploads/images/150009902/profile_dd285a4ac7c163db3390d5763588b3e2.jpg?fit=bounds&format=jpeg&quality=85&width=330",
                  "customDomain": null,
                  "disableSupport": false,
                  "disableGuestPurchase": false,
                  "emailConfirmedFlag": true,
                  "likeAppealText": "お読みいただきありがとうございます！",
                  "likeAppealImage": "https://assets.st-note.com/poc-image/manual/production/preset_reaction_0.png",
                  "purchaseAppealTextNote": null,
                  "twitterNickname": "japan_x_college",
                  "shareAppeal": {
                      "text": null,
                      "image": null
                  },
                  "magazineAddAppeal": {
                      "text": null,
                      "image": null
                  }
              },
              "canRead": true,
              "isAuthor": false,
              "externalUrl": null,
              "customDomain": null,
              "body": "「才能はあるのに、表現の場がない…」「夢を追いかけたいけど、お金がない…」\n\nそんな悩みを抱える学生やアーティストを、僕は全力で応援したい。\n武井佑太です。学生時代からイベント企画・運営に携わり、現在はアーティスト支援や学生の挑戦をサポートする活動に情熱を注いでいます。\n\n多くの才能あるアーティストが、表現の場や経済的な基盤の確保に苦労している現状を目の当たりにし、彼らが安心して創作活動に打ち込める環境を創りたいという強い思いから、この活動をスタートしました。\n\n今回は、先日",
              "separator": null,
              "isLimited": false,
              "isTrial": false,
              "canUpdate": false,
              "tweetText": "【クリスマスGalaでアーティストの夢を輝かせる】v13-2 武井佑太｜Japan_X_College @japan_x_college",
              "twitterRelatedAccounts": "japan_x_college,note_PR",
              "isRefund": false,
              "isLiked": false,
              "commentCount": 0,
              "likes": [],
              "anonymousLikeCount": 8,
              "disableComment": false,
              "hashtags": [
                  {
                      "hashtag": {
                          "name": "#イベント"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#挑戦"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#学生"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#アーティスト"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#運営"
                      }
                  }
              ],
              "twitterShareUrl": "https://twitter.com/intent/tweet?url=https://note.com/japan_x_college/n/n147c4f67d470&text=%E3%80%90%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9Gala%E3%81%A7%E3%82%A2%E3%83%BC%E3%83%86%E3%82%A3%E3%82%B9%E3%83%88%E3%81%AE%E5%A4%A2%E3%82%92%E8%BC%9D%E3%81%8B%E3%81%9B%E3%82%8B%E3%80%91v13-2+%E6%AD%A6%E4%BA%95%E4%BD%91%E5%A4%AA%EF%BD%9CJapan_X_College+%40japan_x_college&related=japan_x_college,note_PR",
              "facebookShareUrl": "https://www.facebook.com/share.php?u=https://note.com/japan_x_college/n/n147c4f67d470&t=%E3%80%90%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9Gala%E3%81%A7%E3%82%A2%E3%83%BC%E3%83%86%E3%82%A3%E3%82%B9%E3%83%88%E3%81%AE%E5%A4%A2%E3%82%92%E8%BC%9D%E3%81%8B%E3%81%9B%E3%82%8B%E3%80%91v13-2+%E6%AD%A6%E4%BA%95%E4%BD%91%E5%A4%AA%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89",
              "lineShareUrl": "https://line.naver.jp/R/msg/text/?%E3%80%90%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9Gala%E3%81%A7%E3%82%A2%E3%83%BC%E3%83%86%E3%82%A3%E3%82%B9%E3%83%88%E3%81%AE%E5%A4%A2%E3%82%92%E8%BC%9D%E3%81%8B%E3%81%9B%E3%82%8B%E3%80%91v13-2+%E6%AD%A6%E4%BA%95%E4%BD%91%E5%A4%AA%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89%0Ahttps://note.com/japan_x_college/n/n147c4f67d470",
              "audio": {},
              "pictures": [],
              "limitedMessage": null,
              "labels": [],
              "priorSale": null,
              "canMultipleLimitedNote": false,
              "isMembershipConnected": false,
              "hasAvailableCirclePlans": false,
              "isPinned": false,
              "pinnedUserNoteId": null,
              "spEyecatch": "https://assets.st-note.com/production/uploads/images/178300901/square_large_f05b3950d817350bd79bea7e06018096.jpeg?fit=bounds&format=jpeg&quality=85&width=360",
              "enableBacktoDraft": false,
              "notificationMessages": [],
              "isProfiled": false,
              "isForWork": false,
              "isCircleDescription": false,
              "noteDraft": null,
              "noteUrl": "https://note.com/japan_x_college/n/n147c4f67d470",
              "imageCount": 7,
              "format": "4.1",
              "capabilities": {
                  "amazonpayCampaign": true,
                  "amazonpay": false,
                  "guestAmazonpay": false,
                  "rubyText": true,
                  "formulaText": true,
                  "duplication": true
              },
              "discountCampaigns": [],
              "remainedCharNum": 0,
              "priceInfo": {
                  "isFree": true,
                  "lowestPrice": null,
                  "hasMultiple": false,
                  "hasSubscription": false,
                  "oneshotLowestPrice": null
              }
          },
          {
              "id": 104207809,
              "type": "TextNote",
              "status": "published",
              "name": "【経済学と人類学で探る資本主義の未来】v5-2 田口響生さんインタビュー",
              "description": null,
              "likeCount": 22,
              "price": 0,
              "key": "n9687affcaa70",
              "slug": "slug-n9687affcaa70",
              "publishAt": "2025-02-15T17:00:00+09:00",
              "thumbnailExternalUrl": "",
              "eyecatch": "https://assets.st-note.com/production/uploads/images/174284439/rectangle_large_type_2_aa6252794689ef20f0620f06d8961fc8.jpeg?fit=bounds&quality=85&width=1280",
              "user": {
                  "id": 8383826,
                  "key": "bbe223eab02a19b93b31d4fd749f0892",
                  "name": "Japan_X_College",
                  "urlname": "japan_x_college",
                  "nickname": "Japan_X_College",
                  "userProfileImagePath": "https://assets.st-note.com/production/uploads/images/150009902/profile_dd285a4ac7c163db3390d5763588b3e2.jpg?fit=bounds&format=jpeg&quality=85&width=330",
                  "customDomain": null,
                  "disableSupport": false,
                  "disableGuestPurchase": false,
                  "emailConfirmedFlag": true,
                  "likeAppealText": "お読みいただきありがとうございます！",
                  "likeAppealImage": "https://assets.st-note.com/poc-image/manual/production/preset_reaction_0.png",
                  "purchaseAppealTextNote": null,
                  "twitterNickname": "japan_x_college",
                  "shareAppeal": {
                      "text": null,
                      "image": null
                  },
                  "magazineAddAppeal": {
                      "text": null,
                      "image": null
                  }
              },
              "canRead": true,
              "isAuthor": false,
              "externalUrl": null,
              "customDomain": null,
              "body": "今回は当団体Japan_X_Collegeのメンバーの1人、田口響生さんにインタビュー！田口さんのこれまでの活動と、これからの活動についてお聞きしました。（取材：すりーむーん）\n\n↓田口さんの自己紹介noteはこちら！\n\n──（筆者）本日はよろしくお願いします！早速ですが、現在の田口さんの活動について教えてください。\n\n田口響生さん（以下、田口）：よろしくお願いします！昨年の9月までは「遊学生」という劇団の代表をしていて、力を入れて活動していました。現在はインターンと卒論に付",
              "separator": null,
              "isLimited": false,
              "isTrial": false,
              "canUpdate": false,
              "tweetText": "【経済学と人類学で探る資本主義の未来】v5-2 田口響生さんインタビュー｜Japan_X_College @japan_x_college",
              "twitterRelatedAccounts": "japan_x_college,note_PR",
              "isRefund": false,
              "isLiked": false,
              "commentCount": 0,
              "likes": [],
              "anonymousLikeCount": 7,
              "disableComment": false,
              "hashtags": [
                  {
                      "hashtag": {
                          "name": "#自分"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#大学生"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#介護"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#活動"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#経済学"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#資本主義"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#文化人類学"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#ジャコメッティ"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#田口"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#JXC"
                      }
                  }
              ],
              "twitterShareUrl": "https://twitter.com/intent/tweet?url=https://note.com/japan_x_college/n/n9687affcaa70&text=%E3%80%90%E7%B5%8C%E6%B8%88%E5%AD%A6%E3%81%A8%E4%BA%BA%E9%A1%9E%E5%AD%A6%E3%81%A7%E6%8E%A2%E3%82%8B%E8%B3%87%E6%9C%AC%E4%B8%BB%E7%BE%A9%E3%81%AE%E6%9C%AA%E6%9D%A5%E3%80%91v5-2+%E7%94%B0%E5%8F%A3%E9%9F%BF%E7%94%9F%E3%81%95%E3%82%93%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%93%E3%83%A5%E3%83%BC%EF%BD%9CJapan_X_College+%40japan_x_college&related=japan_x_college,note_PR",
              "facebookShareUrl": "https://www.facebook.com/share.php?u=https://note.com/japan_x_college/n/n9687affcaa70&t=%E3%80%90%E7%B5%8C%E6%B8%88%E5%AD%A6%E3%81%A8%E4%BA%BA%E9%A1%9E%E5%AD%A6%E3%81%A7%E6%8E%A2%E3%82%8B%E8%B3%87%E6%9C%AC%E4%B8%BB%E7%BE%A9%E3%81%AE%E6%9C%AA%E6%9D%A5%E3%80%91v5-2+%E7%94%B0%E5%8F%A3%E9%9F%BF%E7%94%9F%E3%81%95%E3%82%93%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%93%E3%83%A5%E3%83%BC%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89",
              "lineShareUrl": "https://line.naver.jp/R/msg/text/?%E3%80%90%E7%B5%8C%E6%B8%88%E5%AD%A6%E3%81%A8%E4%BA%BA%E9%A1%9E%E5%AD%A6%E3%81%A7%E6%8E%A2%E3%82%8B%E8%B3%87%E6%9C%AC%E4%B8%BB%E7%BE%A9%E3%81%AE%E6%9C%AA%E6%9D%A5%E3%80%91v5-2+%E7%94%B0%E5%8F%A3%E9%9F%BF%E7%94%9F%E3%81%95%E3%82%93%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%93%E3%83%A5%E3%83%BC%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89%0Ahttps://note.com/japan_x_college/n/n9687affcaa70",
              "audio": {},
              "pictures": [],
              "limitedMessage": null,
              "labels": [],
              "priorSale": null,
              "canMultipleLimitedNote": false,
              "isMembershipConnected": false,
              "hasAvailableCirclePlans": false,
              "isPinned": false,
              "pinnedUserNoteId": null,
              "spEyecatch": "https://assets.st-note.com/production/uploads/images/174284439/square_large_aa6252794689ef20f0620f06d8961fc8.jpeg?fit=bounds&format=jpeg&quality=85&width=360",
              "enableBacktoDraft": false,
              "notificationMessages": [],
              "isProfiled": false,
              "isForWork": false,
              "isCircleDescription": false,
              "noteDraft": null,
              "noteUrl": "https://note.com/japan_x_college/n/n9687affcaa70",
              "imageCount": 7,
              "format": "4.1",
              "capabilities": {
                  "amazonpayCampaign": true,
                  "amazonpay": false,
                  "guestAmazonpay": false,
                  "rubyText": true,
                  "formulaText": true,
                  "duplication": true
              },
              "discountCampaigns": [],
              "remainedCharNum": 0,
              "priceInfo": {
                  "isFree": true,
                  "lowestPrice": null,
                  "hasMultiple": false,
                  "hasSubscription": false,
                  "oneshotLowestPrice": null
              }
          },
          {
              "id": 104539936,
              "type": "TextNote",
              "status": "published",
              "name": "【若者の声を力にする】 v10-4 秀島ちえこ",
              "description": null,
              "likeCount": 22,
              "price": 0,
              "key": "nf2a7ef0a8fa3",
              "slug": "slug-nf2a7ef0a8fa3",
              "publishAt": "2025-02-14T14:30:00+09:00",
              "thumbnailExternalUrl": "",
              "eyecatch": "https://assets.st-note.com/production/uploads/images/174517542/rectangle_large_type_2_b0674789aa0089b5f18aae41e4c14be7.jpeg?fit=bounds&quality=85&width=1280",
              "user": {
                  "id": 8383826,
                  "key": "bbe223eab02a19b93b31d4fd749f0892",
                  "name": "Japan_X_College",
                  "urlname": "japan_x_college",
                  "nickname": "Japan_X_College",
                  "userProfileImagePath": "https://assets.st-note.com/production/uploads/images/150009902/profile_dd285a4ac7c163db3390d5763588b3e2.jpg?fit=bounds&format=jpeg&quality=85&width=330",
                  "customDomain": null,
                  "disableSupport": false,
                  "disableGuestPurchase": false,
                  "emailConfirmedFlag": true,
                  "likeAppealText": "お読みいただきありがとうございます！",
                  "likeAppealImage": "https://assets.st-note.com/poc-image/manual/production/preset_reaction_0.png",
                  "purchaseAppealTextNote": null,
                  "twitterNickname": "japan_x_college",
                  "shareAppeal": {
                      "text": null,
                      "image": null
                  },
                  "magazineAddAppeal": {
                      "text": null,
                      "image": null
                  }
              },
              "canRead": true,
              "isAuthor": false,
              "externalUrl": null,
              "customDomain": null,
              "body": "お久しぶりです、秀嶋ちえこです。\n高校3年生の私が目指すのは、10年後の国政で活躍する政治家になること。\n直近では、学生団体SCEや「民主主義ユースフェスティバル」の主催を通じて、若者の政治参加を加速させようと取り組んでいます。\n「当たり前の日常が守られている社会」を築くために、これから先、どんなアクションを起こしていくのか、ご覧ください。\n\nこれまでの記事はこちら↓\n\n1. ビジョン：当たり前の日常が守られている社会\n\n2. ミッション：10年後、国政で活躍する政治家になる",
              "separator": null,
              "isLimited": false,
              "isTrial": false,
              "canUpdate": false,
              "tweetText": "【若者の声を力にする】 v10-4 秀島ちえこ｜Japan_X_College @japan_x_college",
              "twitterRelatedAccounts": "japan_x_college,note_PR",
              "isRefund": false,
              "isLiked": false,
              "commentCount": 0,
              "likes": [],
              "anonymousLikeCount": 8,
              "disableComment": false,
              "hashtags": [
                  {
                      "hashtag": {
                          "name": "#社会"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#高校生"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#政治"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#活動"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#アクション"
                      }
                  }
              ],
              "twitterShareUrl": "https://twitter.com/intent/tweet?url=https://note.com/japan_x_college/n/nf2a7ef0a8fa3&text=%E3%80%90%E8%8B%A5%E8%80%85%E3%81%AE%E5%A3%B0%E3%82%92%E5%8A%9B%E3%81%AB%E3%81%99%E3%82%8B%E3%80%91+v10-4+%E7%A7%80%E5%B3%B6%E3%81%A1%E3%81%88%E3%81%93%EF%BD%9CJapan_X_College+%40japan_x_college&related=japan_x_college,note_PR",
              "facebookShareUrl": "https://www.facebook.com/share.php?u=https://note.com/japan_x_college/n/nf2a7ef0a8fa3&t=%E3%80%90%E8%8B%A5%E8%80%85%E3%81%AE%E5%A3%B0%E3%82%92%E5%8A%9B%E3%81%AB%E3%81%99%E3%82%8B%E3%80%91+v10-4+%E7%A7%80%E5%B3%B6%E3%81%A1%E3%81%88%E3%81%93%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89",
              "lineShareUrl": "https://line.naver.jp/R/msg/text/?%E3%80%90%E8%8B%A5%E8%80%85%E3%81%AE%E5%A3%B0%E3%82%92%E5%8A%9B%E3%81%AB%E3%81%99%E3%82%8B%E3%80%91+v10-4+%E7%A7%80%E5%B3%B6%E3%81%A1%E3%81%88%E3%81%93%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89%0Ahttps://note.com/japan_x_college/n/nf2a7ef0a8fa3",
              "audio": {},
              "pictures": [],
              "limitedMessage": null,
              "labels": [],
              "priorSale": null,
              "canMultipleLimitedNote": false,
              "isMembershipConnected": false,
              "hasAvailableCirclePlans": false,
              "isPinned": false,
              "pinnedUserNoteId": null,
              "spEyecatch": "https://assets.st-note.com/production/uploads/images/174517542/square_large_b0674789aa0089b5f18aae41e4c14be7.jpeg?fit=bounds&format=jpeg&quality=85&width=360",
              "enableBacktoDraft": false,
              "notificationMessages": [],
              "isProfiled": false,
              "isForWork": false,
              "isCircleDescription": false,
              "noteDraft": null,
              "noteUrl": "https://note.com/japan_x_college/n/nf2a7ef0a8fa3",
              "imageCount": 3,
              "format": "4.1",
              "capabilities": {
                  "amazonpayCampaign": true,
                  "amazonpay": false,
                  "guestAmazonpay": false,
                  "rubyText": true,
                  "formulaText": true,
                  "duplication": true
              },
              "discountCampaigns": [],
              "remainedCharNum": 0,
              "priceInfo": {
                  "isFree": true,
                  "lowestPrice": null,
                  "hasMultiple": false,
                  "hasSubscription": false,
                  "oneshotLowestPrice": null
              }
          },
          {
              "id": 102752236,
              "type": "TextNote",
              "status": "published",
              "name": "「伝統文化を守る」×「世界の医療を繋げる」石田諭基さん・内芝弘尭さん【対談】",
              "description": null,
              "likeCount": 16,
              "price": 0,
              "key": "nbb336b2bde73",
              "slug": "slug-nbb336b2bde73",
              "publishAt": "2025-02-05T18:15:32+09:00",
              "thumbnailExternalUrl": "",
              "eyecatch": "https://assets.st-note.com/production/uploads/images/171057990/rectangle_large_type_2_7398564a63aa314a9552e8fe9b4582bc.png?fit=bounds&quality=85&width=1280",
              "user": {
                  "id": 8383826,
                  "key": "bbe223eab02a19b93b31d4fd749f0892",
                  "name": "Japan_X_College",
                  "urlname": "japan_x_college",
                  "nickname": "Japan_X_College",
                  "userProfileImagePath": "https://assets.st-note.com/production/uploads/images/150009902/profile_dd285a4ac7c163db3390d5763588b3e2.jpg?fit=bounds&format=jpeg&quality=85&width=330",
                  "customDomain": null,
                  "disableSupport": false,
                  "disableGuestPurchase": false,
                  "emailConfirmedFlag": true,
                  "likeAppealText": "お読みいただきありがとうございます！",
                  "likeAppealImage": "https://assets.st-note.com/poc-image/manual/production/preset_reaction_0.png",
                  "purchaseAppealTextNote": null,
                  "twitterNickname": "japan_x_college",
                  "shareAppeal": {
                      "text": null,
                      "image": null
                  },
                  "magazineAddAppeal": {
                      "text": null,
                      "image": null
                  }
              },
              "canRead": true,
              "isAuthor": false,
              "externalUrl": null,
              "customDomain": null,
              "body": "以前当メディアで紹介させていただいた、京都の文化を世界に発信する活動をしている石田諭基さんと、自らの難病を治すため、テクノロジーの力で立ち向かう内芝弘尭さん。\n\n今回はお二人に、イノベーションをテーマに対談していただきました！\nイノベーションを違う側面から起こそうとしている二人。一体どのような話が繰り広げられたのでしょうか?\n\n石田さんの記事はこちら!\n\nひろたかさんの記事はこちら!\n\n⭐️今回の参加メンバー⭐️\n\n石田諭基さん（以下、石田）\n\n内芝弘尭さん。（以下、内芝）\n",
              "separator": null,
              "isLimited": false,
              "isTrial": false,
              "canUpdate": false,
              "tweetText": "「伝統文化を守る」×「世界の医療を繋げる」石田諭基さん・内芝弘尭さん【対談】｜Japan_X_College @japan_x_college",
              "twitterRelatedAccounts": "japan_x_college,note_PR",
              "isRefund": false,
              "isLiked": false,
              "commentCount": 0,
              "likes": [],
              "anonymousLikeCount": 8,
              "disableComment": false,
              "hashtags": [
                  {
                      "hashtag": {
                          "name": "#自分"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#大学生"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#社会人"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#文化"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#イノベーション"
                      }
                  },
                  {
                      "hashtag": {
                          "name": "#活動"
                      }
                  }
              ],
              "twitterShareUrl": "https://twitter.com/intent/tweet?url=https://note.com/japan_x_college/n/nbb336b2bde73&text=%E3%80%8C%E4%BC%9D%E7%B5%B1%E6%96%87%E5%8C%96%E3%82%92%E5%AE%88%E3%82%8B%E3%80%8D%C3%97%E3%80%8C%E4%B8%96%E7%95%8C%E3%81%AE%E5%8C%BB%E7%99%82%E3%82%92%E7%B9%8B%E3%81%92%E3%82%8B%E3%80%8D%E7%9F%B3%E7%94%B0%E8%AB%AD%E5%9F%BA%E3%81%95%E3%82%93%E3%83%BB%E5%86%85%E8%8A%9D%E5%BC%98%E5%B0%AD%E3%81%95%E3%82%93%E3%80%90%E5%AF%BE%E8%AB%87%E3%80%91%EF%BD%9CJapan_X_College+%40japan_x_college&related=japan_x_college,note_PR",
              "facebookShareUrl": "https://www.facebook.com/share.php?u=https://note.com/japan_x_college/n/nbb336b2bde73&t=%E3%80%8C%E4%BC%9D%E7%B5%B1%E6%96%87%E5%8C%96%E3%82%92%E5%AE%88%E3%82%8B%E3%80%8D%C3%97%E3%80%8C%E4%B8%96%E7%95%8C%E3%81%AE%E5%8C%BB%E7%99%82%E3%82%92%E7%B9%8B%E3%81%92%E3%82%8B%E3%80%8D%E7%9F%B3%E7%94%B0%E8%AB%AD%E5%9F%BA%E3%81%95%E3%82%93%E3%83%BB%E5%86%85%E8%8A%9D%E5%BC%98%E5%B0%AD%E3%81%95%E3%82%93%E3%80%90%E5%AF%BE%E8%AB%87%E3%80%91%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89",
              "lineShareUrl": "https://line.naver.jp/R/msg/text/?%E3%80%8C%E4%BC%9D%E7%B5%B1%E6%96%87%E5%8C%96%E3%82%92%E5%AE%88%E3%82%8B%E3%80%8D%C3%97%E3%80%8C%E4%B8%96%E7%95%8C%E3%81%AE%E5%8C%BB%E7%99%82%E3%82%92%E7%B9%8B%E3%81%92%E3%82%8B%E3%80%8D%E7%9F%B3%E7%94%B0%E8%AB%AD%E5%9F%BA%E3%81%95%E3%82%93%E3%83%BB%E5%86%85%E8%8A%9D%E5%BC%98%E5%B0%AD%E3%81%95%E3%82%93%E3%80%90%E5%AF%BE%E8%AB%87%E3%80%91%EF%BD%9CJapan_X_College%EF%BD%9Cnote%EF%BC%88%E3%83%8E%E3%83%BC%E3%83%88%EF%BC%89%0Ahttps://note.com/japan_x_college/n/nbb336b2bde73",
              "audio": {},
              "pictures": [],
              "limitedMessage": null,
              "labels": [],
              "priorSale": null,
              "canMultipleLimitedNote": false,
              "isMembershipConnected": false,
              "hasAvailableCirclePlans": false,
              "isPinned": false,
              "pinnedUserNoteId": null,
              "spEyecatch": "https://assets.st-note.com/production/uploads/images/171057990/square_large_7398564a63aa314a9552e8fe9b4582bc.png?fit=bounds&format=jpeg&quality=85&width=360",
              "enableBacktoDraft": false,
              "notificationMessages": [],
              "isProfiled": false,
              "isForWork": false,
              "isCircleDescription": false,
              "noteDraft": null,
              "noteUrl": "https://note.com/japan_x_college/n/nbb336b2bde73",
              "imageCount": 2,
              "format": "4.1",
              "capabilities": {
                  "amazonpayCampaign": true,
                  "amazonpay": false,
                  "guestAmazonpay": false,
                  "rubyText": true,
                  "formulaText": true,
                  "duplication": true
              },
              "discountCampaigns": [],
              "remainedCharNum": 0,
              "priceInfo": {
                  "isFree": true,
                  "lowestPrice": null,
                  "hasMultiple": false,
                  "hasSubscription": false,
                  "oneshotLowestPrice": null
              }
          }
      ],
      "isLastPage": false,
      "totalCount": 34
  }
}

// Article型への変換
function convertToArticles(contents) {
  return contents.map((content, index) => {
    // タグを抽出（#記号を取り除く）
    const tags = content.hashtags ? content.hashtags.map(tag => tag.hashtag.name.replace(/^#/, '')) : [];
    
    // タイトルから人物名を抽出
    const people = extractPeopleFromTitle(content.name);
    
    // 記事リンク（実際のデータでは空配列）
    const article_links = [];
    
    return {
      id: String(content.id),
      title: content.name,
      note_url: content.noteUrl,  // URLを追加
      published_at: content.publishAt,
      people: people,
      tags: tags,
      article_links: article_links,
      sort_index: index + 1,
      eyecatch: content.eyecatch  // 写真のURLを追加
    };
  });
}

// タイトルから人物名を抽出する関数
function extractPeopleFromTitle(title) {
  const people = [];
  
  // 人物名の抽出パターン
  if (title.includes('ぐみ沢エイ子')) {
    people.push('ぐみ沢エイ子');
  } else if (title.includes('加藤憧')) {
    people.push('加藤憧');
  } else if (title.includes('武井佑太')) {
    people.push('武井佑太');
  } else if (title.includes('田口響生')) {
    people.push('田口響生');
  } else if (title.includes('秀島ちえこ')) {
    people.push('秀島ちえこ');
  } else if (title.includes('石田諭基')) {
    people.push('石田諭基');
    if (title.includes('内芝弘尭')) {
      people.push('内芝弘尭');
    }
  } else if (title.includes('内芝弘尭')) {
    people.push('内芝弘尭');
  } else {
    // デフォルト値
    people.push('japan_x_college');
  }
  
  return people;
}

// APIレスポンスの全記事データを処理
const processAllArticles = () => {
  console.log('全記事データを処理します...');
  return convertToArticles(allNoteArticles.data.contents);
};

// 指定された数の記事データだけを処理
const processLimitedArticles = (limit = 6) => {
  console.log(`最初の${limit}記事だけを処理します...`);
  const limitedContents = allNoteArticles.data.contents.slice(0, limit);
  return convertToArticles(limitedContents);
};

// 処理する記事データを選択（全記事:34件 または 制限:6件）
const articles = process.argv.includes('--all') 
  ? processAllArticles() 
  : processLimitedArticles(6);

// キャッシュデータの作成
const cacheData = {
  timestamp: Date.now(),
  data: articles
};

// キャッシュディレクトリのパス
const cacheDir = path.join(__dirname, 'data', 'cache');

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
  console.log(`キャッシュディレクトリを作成しました: ${cacheDir}`);
}

// キャッシュファイルのパス
const cachePath = path.join(cacheDir, 'notes.json');

// キャッシュファイルの保存
fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
console.log(`キャッシュファイルを更新しました: ${cachePath}`);
console.log(`合計 ${articles.length} 記事のデータをキャッシュに保存しました。`); 