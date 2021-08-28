import React from 'react'
import Preloader from "../Components/Common/Preloader/Preloader";

const withSuspense = Component => <React.Suspense fallback={<Preloader/>}><Component/></React.Suspense>
export default withSuspense