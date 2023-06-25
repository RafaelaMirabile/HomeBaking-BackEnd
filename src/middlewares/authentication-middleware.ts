import * as jwt from 'jsonwebtoken';
import { Request, ResponseToolkit, ResponseObject, ServerRoute } from "@hapi/hapi"


export async function authenticateToken(req: Request, h: ResponseToolkit) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return generateUnauthorizedResponse(h);

  const token = authHeader.split(' ')[1];
  if (!token) return generateUnauthorizedResponse(h);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await prisma.session.findFirst({
      where: {
        token,
      },
    });
    if (!session) return generateUnauthorizedResponse(h);

    req.app.userId = userId;
    // TODO: Modify here for additional logic
    return h.continue;
  } catch (err) {
    return generateUnauthorizedResponse(h);
  }
}

function generateUnauthorizedResponse(h) {
  return h.response(unauthorizedError()).code(401);
}

export interface JWTPayload {
  userId: number;
}
