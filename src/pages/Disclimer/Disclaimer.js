
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';
import SpinnerLoading from '../../components/SpinnerComponents/SpinnerLoader';

const Disclaimer = () => {
    const [loading, setLoading] = useState(true)
    const templateList = useSelector(state => state.TemplateReducer.templateList);
    const [content, setContent] = useState()
    useEffect(() => {
        const timer = setTimeout(() => {
            const data = templateList?.find(x => x?.name === "DISCLAIMER");
            setContent(data?.template || '');
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [templateList])
    if (loading) {
        return <SpinnerLoading loading={loading} />;
    }
    return (
        <div className=''>
            <div className='custom-container'>
                <div className='container mt-5'>
                    <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(content) }} />
                </div>
            </div>

            <div className='mt-2'>
                <FooterComponents></FooterComponents>
            </div>

        </div>
    )
}
export default Disclaimer