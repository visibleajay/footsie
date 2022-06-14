import React from "react";
import styled from "styled-components";
import { IPlayer } from "../app/store/footballManagerSlice";

const DetailView = styled.div`
  height: 100%;
  background: var(--neutralbackground-1);
  border-radius: 4px;
  margin-left: 32px;
  flex: 2;
`;

const Player = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 208px;
  margin: 24px;

  div.number {
    position: absolute;
    top: 40px;
    left: 0px;
    height: 100px;
    width: 40px;

    & span.big {
      font-weight: 600;
      font-size: 109.714px;
      color: #3a3731;
    }

    & span.small {
      color: var(--primaryorange);
      font-weight: 600;
      font-size: 41.1429px;
      position: absolute;
      left: 5px;
    }
  }

  span.name {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: -29px;
    left: 0px;

    & span.n {
      font-weight: 500;
      font-size: 24px;
      color: #ffffff;
      padding-bottom: 5px;
    }

    & span.p {
      font-weight: 600;
      font-size: 18px;
      color: var(--primaryorange);
    }
  }
`;

const HeightWeight = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;

  & div {
    display: flex;
    flex-direction: column;
    color: var(--textheadings);
    & span.h {
      font-weight: 400;
      font-size: 12px;
      color: var(--textnormal);
    }
  }
`;

const Separator = styled.div`
  border: 1px solid #494949;
  margin: 0px 24px;
  height: 1px;
`;

const BottomBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  height: 100px;
  margin: 24px;
  font-size: 12px;
  font-weight: 400;
  color: var(--textnormal);

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div > span {
    font-weight: 400;
    font-size: 12px;
    color: var(--textnormal);
  }

  .h {
    font-size: 24px;
    font-weight: 600;
    color: var(--primaryorange);
  }
`;

export default function PlayerDetail({
  player_image,
  jersey_number,
}: Partial<IPlayer>) {
  return (
    <DetailView>
      <Player>
        <div className="number">
          <span className="big">1</span>
          <span className="small">1</span>
        </div>
        <img src={player_image} alt="" style={{ height: 258 }} />
        <span className="name">
          <span className="n">Keylor Navas</span>
          <span className="p">Goalkeeper</span>
        </span>
      </Player>
      <HeightWeight>
        <div>
          <span className="h">Height</span>
          <span>1.87m</span>
        </div>
        <div>
          <span className="h">Weight</span>
          <span>1.87m</span>
        </div>
        <div>
          <span className="h">Nationality</span>
          <span>Costa Rica</span>
        </div>
      </HeightWeight>
      <Separator></Separator>
      <BottomBlock>
        <div>
          <div>
            <span className="h">26</span>
            <span>Appearances</span>
          </div>

          <div>
            <span className="h">10</span>
            <span>Clean Sheets</span>
          </div>
        </div>
        <div style={{ paddingLeft: 48 }}>
          <div>
            <span className="h">2308</span>
            <span>Minutes Played</span>
          </div>

          <div>
            <span className="h">8</span>
            <span>Saves</span>
          </div>
        </div>
      </BottomBlock>
    </DetailView>
  );
}
