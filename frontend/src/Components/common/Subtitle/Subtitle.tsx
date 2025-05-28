import React from 'react'

interface SubtitleProps {
  subtitle: any;
}

const Subtitle: React.FC<SubtitleProps> = ({subtitle}) =>{
    return (
      <h3 className="section__subtitle">{subtitle}</h3>
    );
};

export default Subtitle;