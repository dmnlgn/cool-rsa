import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface ICard {
  children?: ReactNode;
  cardContainerClass?: string;
}

interface ICardComponent extends FC<ICard> {
  Header: FC<ICard>;
  Body: FC<ICard>;
}

const Card: ICardComponent = ({ children, cardContainerClass }) => {
  return (
    <div
      className={classNames(
        "flex flex-col border border-solid border-cGray100 rounded-[10px] bg-cLight100 overflow-hidden",
        cardContainerClass
      )}
    >
      {children}
    </div>
  );
};

const CardHeader: FC<ICard> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <div className="border-solid border-b border-cGray100 py-[5px] px-[10px]">
      <span className="text-[18px] font-semibold">{children}</span>
    </div>
  );
};

const CardBody: FC<ICard> = ({ children }) => {
  if (!children) {
    return null;
  }

  return <div className="py-[5px] px-[10px]">{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;

Card.Header.displayName = "Card.Header";
Card.Body.displayName = "Card.Body";

export default Card;
