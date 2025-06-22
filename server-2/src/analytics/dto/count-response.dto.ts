import { ApiProperty } from "@nestjs/swagger";

export class CountResponseDTO {
  @ApiProperty()
  users: number;

  @ApiProperty()
  tours: number;

  @ApiProperty()
  activities: number;

  @ApiProperty()
  destinations: number;

  @ApiProperty()
  bookings: number;
}
