import { options } from './parts/_options';

if (typeof window.MonsterPlay !== 'undefined') {
    window.MonsterPlay.setOptions(options);
    window.MonsterPlay.init();
}
