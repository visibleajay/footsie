import React from "react";
import { useMemo } from "react";
import styled from "styled-components";
import { formatHeight, formatWeight } from "../common/utils";

const DetailView = styled.div`
  position: relative;
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

    .f {
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      
      & > img {
        margin-right: 10px;
      }
    }
  }
`;

const Separator = styled.div`
  border: 1px solid #494949;
  position: absolute;
  top: 360px;
  left: 24px;
  width: calc(100% - 48px);
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
  justify-content: space-between;

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
  isDisplay = false,
  player_name = "",
  player_image = "",
  jersey_number = "",
  position = "",
  height = "",
  weight = "",
  nationality = "",
  flag_image = "",
  appearances = "",
  clean_sheets = "",
  saves = "",
  goals = "",
  minutes_played = "",
  assists = "",
}: {
  isDisplay: boolean;
  player_name: string;
  player_image: string;
  jersey_number: string;
  position: string;
  height: string;
  weight: string;
  nationality: string;
  flag_image: string;
  appearances: string;
  clean_sheets: string;
  saves: string;
  goals: string;
  minutes_played: string;
  assists: string;
}) {
  const isGoalie = useMemo(() => {
    return clean_sheets !== "N/A" || saves !== "N/A";
  }, [clean_sheets, saves]);
  return (
    <DetailView>
      {isDisplay && (
        <>
          <Player>
            <div className="number">
              <span className="big">{jersey_number}</span>
              <span className="small">{jersey_number}</span>
            </div>
            <img src={player_image} alt="" style={{ height: 258 }} />
            <span className="name">
              <span className="n">{player_name}</span>
              <span className="p">{position}</span>
            </span>
          </Player>
          <HeightWeight>
            <div>
              <span className="h">Height</span>
              <span>{formatHeight(height || "")}</span>
            </div>
            <div>
              <span className="h">Weight</span>
              <span>{formatWeight(weight || "")}</span>
            </div>
            <div style={{ width: 120 }}>
              <span className="h">Nationality</span>
              <span className="f">
                <img src={flag_image} alt="" width={16} height={16} />
                {nationality}
              </span>
            </div>
          </HeightWeight>

          <BottomBlock>
            <div>
              <div>
                <span className="h">{appearances}</span>
                <span>Appearances</span>
              </div>

              <div>
                {isGoalie ? (
                  <>
                    <span className="h">{clean_sheets}</span>
                    <span>Clean Sheets</span>
                  </>
                ) : (
                  <>
                    <span className="h">{goals}</span>
                    <span>Goals</span>
                  </>
                )}
              </div>
            </div>
            <div style={{ paddingRight: 48 }}>
              <div>
                <span className="h">{minutes_played}</span>
                <span>Minutes Played</span>
              </div>

              <div>
                {isGoalie ? (
                  <>
                    <span className="h">{saves}</span>
                    <span>Saves</span>
                  </>
                ) : (
                  <>
                    <span className="h">{assists}</span>
                    <span>Assits</span>
                  </>
                )}
              </div>
            </div>
          </BottomBlock>
        </>
      )}
      <Separator></Separator>
    </DetailView>
  );
}
