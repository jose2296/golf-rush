import Loader from '@shared/components/loader';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './core/routes';

export const Initialize = () => {
    return (
        <div>
            <Suspense fallback={<Loader />}>
                <RouterProvider router={Router} />
            </Suspense>
        </div>
    );
};
