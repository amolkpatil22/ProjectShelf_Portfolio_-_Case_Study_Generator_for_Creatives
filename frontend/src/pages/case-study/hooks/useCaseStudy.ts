import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useParams } from 'react-router-dom';
import { CaseStudy } from '../../../pages/portfolio-builder/types/portfolioBuilderTypes';

export const useCaseStudy = () => {
    const { id } = useParams<{ id: string }>();
    const portfolio = useSelector((state: RootState) => state.portfolio.currentPortfolio);

    const caseStudy = portfolio?.caseStudies.find(study => study.id === id);
    const loading = useSelector((state: RootState) => state.portfolio.loading);
    const error = useSelector((state: RootState) => state.portfolio.error);

    return {
        caseStudy: caseStudy as CaseStudy | undefined,
        loading,
        error,
        notFound: !loading && !error && !caseStudy
    };
}; 