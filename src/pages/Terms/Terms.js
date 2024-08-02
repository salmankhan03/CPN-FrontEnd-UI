
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';
import SpinnerLoading from '../../components/SpinnerComponents/SpinnerLoader';
import Header from '../../components/HeaderComponents/HeaderComponents';
const TermsAndCondition = () => {
    window.scrollTo(0, 0);
    const [loading, setLoading] = useState(true)
    const templateList = useSelector(state => state.TemplateReducer.templateList);
    const [content, setContent]= useState()
    useEffect(()=>{
        const timer = setTimeout(() => {
            const data = templateList?.find(x => x?.name === "TERMS & CONDITIONS");
            setContent(data?.template || '');
            setLoading(false); 
        }, 500); 
        return () => clearTimeout(timer);
      
    },[templateList])
    if (loading) {
        return <SpinnerLoading loading={loading} />;
    }
    return (
        <div className=''>
            <Header/>
            <div className='custom-container container'>
                <div className='container mt-5' >
                    <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(content) }} />
                </div>
           
            <div className='mt-2'>
                <FooterComponents></FooterComponents>
            </div>
            </div>

        </div>
    )
}
export default TermsAndCondition