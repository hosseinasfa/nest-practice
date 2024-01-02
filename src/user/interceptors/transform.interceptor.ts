import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        console.log("Before ...");

        return next.handle().pipe(
            map((data) => {
                console.log("After ...");
                console.log(data);
                const response = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                }
                return response;
            })
        );
    }
}
