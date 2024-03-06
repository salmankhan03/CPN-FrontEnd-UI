
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';
const Disclaimer = () => {
    const templateList = useSelector(state => state.TemplateReducer.templateList);
    const [content, setContent] = useState()
    useEffect(() => {
        let data = templateList?.find((x) => x?.name === "DISCLAIMER")
        setContent(data?.template)
    }, [templateList])
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