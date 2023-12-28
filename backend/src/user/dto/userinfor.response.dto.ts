import { User, UserPoint, UserRole } from '@prisma/client';
import { ResponseDto } from 'src/Response.dto';
export class UserinforResponseDto extends ResponseDto{
 setUserInfor(user: User, userPoint: UserPoint, userRole: UserRole) {
    this.setData({user,userPoint,userRole});
 }
}
