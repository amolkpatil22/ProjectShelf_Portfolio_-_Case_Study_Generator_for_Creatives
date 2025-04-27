import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Case Study specific hooks
export const useCaseStudies = () => useAppSelector((state) => state.caseStudy.caseStudies);
export const useCurrentCaseStudy = () => useAppSelector((state) => state.caseStudy.currentCaseStudy);
export const useCaseStudyLoading = () => useAppSelector((state) => state.caseStudy.loading);
export const useCaseStudyError = () => useAppSelector((state) => state.caseStudy.error); 