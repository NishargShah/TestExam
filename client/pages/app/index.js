import React, { useState, useEffect } from 'react';
import { Carousel } from "react-bootstrap";
import { images } from "../../store/actions";
import App from "../../components/shared/app/app";
import { connect } from "react-redux";

const Index = ({images}) => {
    const [carousel, setCarousel] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const imgs = await images();
            setCarousel(imgs);
            setLoading(false);
        })();
    }, [])

    return (
        <App title="Dashboard" sectionClass="dashboard">
            {
                !loading && <Carousel>
                    {
                        carousel.map((cur, i) => {
                            return <Carousel.Item key={i}>
                                <img
                                    className="d-block w-100"
                                    style={{height: '30rem'}}
                                    src={`${process.env.SERVER_SITE}/assets/img/${i + 1}.jpg`}
                                    alt={i + ' carousel'}
                                />
                            </Carousel.Item>
                        })
                    }
                </Carousel>
            }
        </App>
    )
}

export default connect(null, {images})(Index);
