import React from 'react';

export interface ILifeEnergyProps {
  budgetId: string;
}

class LifeEnergy extends React.Component<ILifeEnergyProps> {
  render() {
    return (
      <div>
        This section will be to do the following
        <ol>
          <li>Convert all transactions into how many hours of work it cost</li>
        </ol>
      </div>
    );
  }
}
export default LifeEnergy;
