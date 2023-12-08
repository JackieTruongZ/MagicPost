import { ResponseDto } from "src/Response.dto"

export class AuthResponseDto extends ResponseDto {
    setAccessToken(accessToken: string) {
        this.setData({ access_token: accessToken });
      }
}