import { encrypt, decrypt } from './crypt';
import packageJson from '../../package.json';

interface CacheConfig {
  type: 'localStorage' | 'sessionStorage';
  prefix: string;
  expire: number;
  isEncrypt: boolean;
}
// 区分存储类型 type
// 自定义名称前缀 prefix
// 支持设置过期时间 expire
// 支持加密可选，开发环境下未方便调试可关闭加密

// 支持数据加密 这里采用 crypto-js 加密 也可使用其他方式

// 判断是否支持 Storage isSupportStorage

// 设置 setStorage

// 获取 getStorage

// 是否存在 hasStorage

// 获取所有key getStorageKeys

// 根据索引获取key getStorageForIndex

// 获取localStorage长度 getStorageLength

// 获取全部 getAllStorage

// 删除 removeStorage

// 清空 clearStorage

//定义参数 类型 window.localStorage,window.sessionStorage,
const config: CacheConfig = {
  type: 'localStorage', // 本地存储类型 localStorage/sessionStorage
  prefix: `${packageJson.name}_${packageJson.version}`, // 名称前缀 建议：项目名 + 项目版本
  expire: 1, //过期时间 单位：秒
  isEncrypt: true // 默认加密 为了调试方便, 开发过程中可以不加密
};

// 名称前自动添加前缀
const autoAddPrefix = (key: string) => {
  const prefix = config.prefix ? config.prefix + '_' : '';
  return prefix + key;
};

// 移除已添加的前缀
const autoRemovePrefix = (key: string) => {
  const len = config.prefix ? config.prefix.length + 1 : '';
  if (len) {
    return key.substr(len);
  }
  return key;
};

// 设置 setStorage
export const setStorage = (key: string, value: any, expire = 0) => {
  if (value === '' || value === null || value === undefined) {
    value = null;
  }

  if (isNaN(expire) || expire < 0) throw new Error('Expire must be a number');

  expire = (expire ? expire : config.expire) * 1000;
  const data = {
    value: value, // 存储值
    time: Date.now(), //存值时间戳
    expire: expire // 过期时间
  };

  const encryptString = config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data);
  if (encryptString) {
    window[config.type].setItem(autoAddPrefix(key), encryptString);
  }
};

// 获取 getStorage
export const getStorage = (key: string) => {
  key = autoAddPrefix(key);
  // key 不存在判断
  if (
    !window[config.type].getItem(key) ||
    JSON.stringify(window[config.type].getItem(key)) === 'null'
  ) {
    return null;
  }

  const value = window[config.type].getItem(key);
  let storage;
  if (value) {
    // 优化 持续使用中续期
    storage = config.isEncrypt ? JSON.parse(decrypt(value)) : JSON.parse(value);
  }

  const nowTime = Date.now();

  // 过期删除
  if (config?.expire * 6000 < nowTime - storage.time) {
    removeStorage(key);
    return null;
  } else {
    // 未过期期间被调用 则自动续期 进行保活
    setStorage(autoRemovePrefix(key), storage.value);
    return storage.value;
  }
};

// 是否存在 hasStorage
export const hasStorage = (key: string) => {
  key = autoAddPrefix(key);
  const arr = getStorageAll().filter(item => {
    return item.key === key;
  });
  return arr.length ? true : false;
};

// 获取所有key
export const getStorageKeys = () => {
  const items = getStorageAll();
  const keys: any[] = [];
  items?.forEach(i => {
    keys.push(i.key);
  });

  return keys;
};

// 根据索引获取key
export const getStorageForIndex = (index: number) => {
  return window[config.type].key(index);
};

// 获取localStorage长度
export const getStorageLength = () => {
  return window[config.type].length;
};

// 获取全部 getAllStorage
export const getStorageAll = () => {
  const len = window[config.type].length; // 获取长度
  const arr = []; // 定义数据集
  for (let i = 0; i < len; i++) {
    // 获取key 索引从0开始
    const getKey = window[config.type].key(i);
    // 获取key对应的值
    let getVal = null;
    if (getKey) {
      getVal = window[config.type].getItem(getKey);
    }
    // 放进数组
    arr[i] = { key: getKey, val: getVal };
  }
  return arr;
};

// 删除 removeStorage
export const removeStorage = (key: string) => {
  window[config.type].removeItem(autoAddPrefix(key));
};

// 清空 clearStorage
export const clearStorage = () => {
  window[config.type].clear();
};
