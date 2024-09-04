import { lazy } from 'react';

const Frm12 = lazy(() => import('../components/frames/Frm12.jsx'));
const Frm13 = lazy(() => import('../components/frames/Frm13.jsx'));
const Frm21 = lazy(() => import('../components/frames/Frm21.jsx'));
const Frm22 = lazy(() => import('../components/frames/Frm22.jsx'));
const Frm23 = lazy(() => import('../components/frames/Frm23.jsx'));
const Frm24 = lazy(() => import('../components/frames/Frm24.jsx'));
const Frm26 = lazy(() => import('../components/frames/Frm26.jsx'));
const Frm27 = lazy(() => import('../components/frames/Frm27.jsx'));
const Frm28 = lazy(() => import('../components/frames/Frm28.jsx'));

export const componentMap = {
    'Frm12': Frm12,
    'Frm13': Frm13,
    'Frm21': Frm21,
    'Frm22': Frm22,
    'Frm23': Frm23,
    'Frm24': Frm24,
    'Frm26': Frm26,
    'Frm27': Frm27,
    'Frm28': Frm28
};