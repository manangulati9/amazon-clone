import { CARD_GROUP } from "@/lib/data/home-page";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { AspectRatio } from "@ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../_components/ui/button";
import { db } from "@/server/db";
import { ImageCarousel } from "../_components/ImageCarousel";

export default async function Page() {
  const todays_deals = await db.product.findMany({
    take: 6,
    where: {
      images: {
        isEmpty: false,
      },
    },
  });

  const top_smartphones = await db.product.findMany({
    take: 6,
    where: {
      category: "Mobile",
    },
  });

  return (
    <div className="container p-4">
      <ImageCarousel />

      {/* Card Group */}
      <div className="py-4 px-8 space-y-4 lg:-mt-[15rem]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CARD_GROUP.slice(0, 4).map((card, i) => (
            <Card
              key={i}
              className="flex z-10 flex-col justify-between rounded-none"
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="flex flex-wrap gap-4">
                  {card.items.map((item, ind) => (
                    <div
                      key={ind}
                      className="flex-1 space-y-1 aspect-square min-w-[70px] lg:min-w-[100px]"
                    >
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={item.image}
                          alt=""
                          className="object-cover"
                          fill
                        />
                      </AspectRatio>
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className={buttonVariants({
                    variant: "link",
                    className: "px-0",
                  })}
                >
                  See more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Today's Deals */}
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Today&apos;s deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {todays_deals.map((item, ind) => (
                <div
                  key={ind}
                  className="flex-1 space-y-1 aspect-square min-w-[70px] lg:min-w-[100px]"
                >
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={item.images[0]!}
                      alt=""
                      className="object-cover"
                      fill
                    />
                  </AspectRatio>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href=""
              className={buttonVariants({
                variant: "link",
                className: "w-fit px-0",
              })}
            >
              See More
            </Link>
          </CardFooter>
        </Card>

        {/* Card Group */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CARD_GROUP.slice(1, 5).map((card, i) => (
            <Card
              key={i}
              className="flex flex-col justify-between rounded-none"
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="flex flex-wrap gap-4">
                  {card.items.map((item, ind) => (
                    <div
                      key={ind}
                      className="flex-1 space-y-1 aspect-square min-w-[70px] lg:min-w-[100px]"
                    >
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={item.image}
                          alt=""
                          className="object-cover"
                          fill
                        />
                      </AspectRatio>
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className={buttonVariants({
                    variant: "link",
                    className: "px-0",
                  })}
                >
                  See more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Top Smartphones */}
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Top Smartphones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {top_smartphones.map((item, ind) => (
                <div
                  key={ind}
                  className="flex-1 space-y-1 aspect-square min-w-[70px] lg:min-w-[100px]"
                >
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={item.images[0]!}
                      alt=""
                      className="object-cover"
                      fill
                    />
                  </AspectRatio>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href=""
              className={buttonVariants({
                variant: "link",
                className: "px-0 w-fit",
              })}
            >
              See More
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
