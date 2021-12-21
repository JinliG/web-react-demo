import { atom } from 'recoil';

const userInfoState = atom<any>({
  key: 'userInfo',
  default: {
    token: '',
    nickName: 'xx',
  },
});
export const xxxState: any = '';
export {
  userInfoState,
};
