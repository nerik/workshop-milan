SELECT
  ny_census_tracts.shape_area,
  nycd.borocd,
  nycd.the_geom,
  nycd.the_geom_webmercator
  FROM ny_census_tracts, nycd

  WHERE ST_intersects(ny_census_tracts.the_geom, nycd.the_geom)
  AND
  (st_area(st_intersection(ny_census_tracts.the_geom, nycd.the_geom))/st_area(ny_census_tracts.the_geom)) > .5




  UPDATE
    ny_census_tracts
  SET
    cd = nycd.borocd
  FROM
  nycd
    WHERE
boroname = 'Brooklyn'
AND
ST_IsValid(nycd.the_geom)
AND
ST_intersects(ny_census_tracts.the_geom, nycd.the_geom)
    AND
    (st_area(st_intersection(ny_census_tracts.the_geom, nycd.the_geom))/st_area(ny_census_tracts.the_geom)) > .5





    SELECT *,
    white_pop::float/total_pop::float as __pct_white,
    asian_pop::float/total_pop::float as __pct_asian,
    black_pop::float/total_pop::float as __pct_black,
    hispanic_or_latino_pop::float/total_pop::float as __pct_hispanic
    from nyc_census_clipped where
    total_pop > 0

    /*geoid::text like '36005%' or
    geoid::text like '36047%' or
    geoid::text like '36081%' or
    geoid::text like '36061%'*/



    SELECT
_cd,
sum(total_pop) total,
sum(male_pop) sex_male,
sum(female_pop) sex_female,
avg(median_age) age_avg_median,
sum(white_pop) ethn_white,
sum(black_pop) ethn_black,
sum(hispanic_or_latino_pop) ethn_hispanic,
sum(asian_pop) ethn_asian,
avg(median_household_income) household_income_avg_median,
avg(aggregate_travel_time_to_work_in_minutes) travel_time_to_work_mn_avg,
sum(commuters_by_car_truck_or_van) commuters_car,
sum(commuters_by_public_transportation) commuters_public,
sum(commuters_by_bus) commuters_bus,
sum(commuters_by_subway_or_elevated) commuters_subway
FROM
nyc_census_cd
GROUP BY
_cd


SELECT
nycd.borocd,
nyct.cartodb_id,
nycd.the_geom,
nycd.the_geom_webmercator,
nyct.total,
nyct.sex_male,
nyct.sex_female,
nyct.age_avg_median,
nyct.ethn_white,
nyct.ethn_black,
nyct.ethn_hispanic,
nyct.ethn_asian,
nyct.household_income_avg_median,
ST_Area(nycd.the_geom::geography)/1000000 area_km2
FROM nyc_census_by_cd nyct, nycd
WHERE nyct._cd = nycd.borocd::text


SELECT
borocd, total, age_avg_median, area_km2, ethn_asian, ethn_black, ethn_hispanic, ethn_white, household_income_avg_median, sex_female, sex_male
FROM nyc_census_by_cd_final
