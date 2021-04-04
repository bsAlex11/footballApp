import React, {FunctionComponent, useState} from 'react';
import Card from '../../components/card/Card';
import Test from '../../components/test';
import GameSelection from './sections/game-selection/GameSelection';

const CreateEvent: FunctionComponent = () => {
  const [formState, setFormState] = useState({
    gameName: 'root',
    eventName: 'aiaiiiiai'
  });

  const sections = [
    {
      title: 'Select a game',
      subtitle: 'Here you can choose a game to play',
      renderContent: () => (
        <GameSelection />
      )
    }
  ];

  return (
    // <Card
    //   title={'Select a game'}
    //   renderContent={() => <p></p>}
    // />
    <>
      {sections.map((section) => (
        <Card
          key={section.title}
          title={section.title}
          subtitle={section.subtitle}
          renderContent={section.renderContent}
        />
      ))}
    </>
  );
};

export default CreateEvent;