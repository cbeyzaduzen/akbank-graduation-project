import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../store/reducers';

// Typed useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;